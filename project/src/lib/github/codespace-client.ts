import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { GitHubClient } from './github-client';

export class CodespaceClient {
  private static instance: CodespaceClient;
  private githubClient: GitHubClient;

  private constructor() {
    this.githubClient = GitHubClient.getInstance();
  }

  static getInstance(): CodespaceClient {
    if (!CodespaceClient.instance) {
      CodespaceClient.instance = new CodespaceClient();
    }
    return CodespaceClient.instance;
  }

  async verifyCodespaceAccess(): Promise<boolean> {
    try {
      const isGitHubConnected = await this.githubClient.verifyConnection();
      if (!isGitHubConnected) {
        thoughtLogger.log('warning', 'GitHub connection required for Codespace access');
        return false;
      }

      thoughtLogger.log('success', 'Codespace access verified');
      return true;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to verify Codespace access', { error });
      return false;
    }
  }

  async getCurrentCodespaceInfo(): Promise<any> {
    try {
      const { data } = await this.githubClient.octokit.rest.codespaces.get({
        codespace_name: import.meta.env.CODESPACE_NAME || ''
      });

      return {
        name: data.name,
        repository: data.repository?.full_name,
        branch: data.git_status?.ref,
        environment: data.environment
      };
    } catch (error) {
      throw new AppError('Failed to get Codespace info', 'CODESPACE_ERROR', error);
    }
  }

  async syncWithRepository(): Promise<void> {
    try {
      const info = await this.getCurrentCodespaceInfo();
      if (!info.repository) {
        throw new AppError('No repository associated with Codespace', 'CODESPACE_ERROR');
      }

      const [owner, repo] = info.repository.split('/');
      await this.githubClient.getRepository(owner, repo);

      thoughtLogger.log('success', 'Synced with repository successfully');
    } catch (error) {
      throw new AppError('Failed to sync with repository', 'CODESPACE_ERROR', error);
    }
  }

  isCodespaceEnvironment(): boolean {
    return Boolean(import.meta.env.CODESPACE_NAME);
  }
}