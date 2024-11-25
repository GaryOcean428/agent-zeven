import { Octokit } from 'octokit';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { config } from '../config';
import { RateLimiter } from '../api/rate-limiter';
import type { Repository, Branch, PullRequest, FileChange } from './types';

export class GitHubClient {
  private static instance: GitHubClient;
  private octokit: Octokit | null = null;
  private initialized = false;
  private rateLimiter: RateLimiter;

  private constructor() {
    this.rateLimiter = new RateLimiter({
      maxRequests: 5000,
      interval: 60 * 60 * 1000 // 1 hour
    });

    if (!config.apiKeys.github) {
      thoughtLogger.log('warning', 'GitHub API key not configured');
    }
  }

  static getInstance(): GitHubClient {
    if (!GitHubClient.instance) {
      GitHubClient.instance = new GitHubClient();
    }
    return GitHubClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      if (!config.apiKeys.github) {
        throw new AppError('GitHub API key not configured', 'CONFIG_ERROR');
      }

      this.octokit = new Octokit({
        auth: config.apiKeys.github,
        baseUrl: config.services.github.baseUrl,
        headers: {
          'X-GitHub-Api-Version': config.services.github.apiVersion
        }
      });

      // Verify connection
      const { data: user } = await this.octokit.rest.users.getAuthenticated();
      
      thoughtLogger.log('success', 'GitHub client initialized successfully', {
        username: user.login
      });

      this.initialized = true;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to initialize GitHub client', { error });
      throw new AppError('GitHub initialization failed', 'GITHUB_ERROR', error);
    }
  }

  async listRepositories(options: {
    type?: 'all' | 'owner' | 'public' | 'private' | 'member';
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  } = {}): Promise<Repository[]> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.listForAuthenticatedUser(options);
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to list repositories', { error });
      throw new AppError('Failed to list repositories', 'GITHUB_ERROR', error);
    }
  }

  async getRepository(owner: string, repo: string): Promise<Repository> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.get({ owner, repo });
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get repository', { error });
      throw new AppError('Failed to get repository', 'GITHUB_ERROR', error);
    }
  }

  async createRepository(options: {
    name: string;
    description?: string;
    private?: boolean;
    auto_init?: boolean;
  }): Promise<Repository> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.createForAuthenticatedUser(options);
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to create repository', { error });
      throw new AppError('Failed to create repository', 'GITHUB_ERROR', error);
    }
  }

  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.getContent({
        owner,
        repo,
        path
      });

      if ('content' in data) {
        return Buffer.from(data.content, 'base64').toString('utf-8');
      }
      throw new Error('Not a file');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get file content', { error });
      throw new AppError('Failed to get file content', 'GITHUB_ERROR', error);
    }
  }

  async createOrUpdateFile(params: {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    branch?: string;
    sha?: string;
  }): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      await this.octokit!.rest.repos.createOrUpdateFileContents({
        ...params,
        content: Buffer.from(params.content).toString('base64')
      });
    } catch (error) {
      thoughtLogger.log('error', 'Failed to create/update file', { error });
      throw new AppError('Failed to create/update file', 'GITHUB_ERROR', error);
    }
  }

  async createPullRequest(params: {
    owner: string;
    repo: string;
    title: string;
    head: string;
    base: string;
    body?: string;
  }): Promise<PullRequest> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.pulls.create(params);
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to create pull request', { error });
      throw new AppError('Failed to create pull request', 'GITHUB_ERROR', error);
    }
  }

  async mergePullRequest(params: {
    owner: string;
    repo: string;
    pull_number: number;
    merge_method?: 'merge' | 'squash' | 'rebase';
  }): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }

    await this.rateLimiter.acquire();

    try {
      await this.octokit!.rest.pulls.merge(params);
    } catch (error) {
      thoughtLogger.log('error', 'Failed to merge pull request', { error });
      throw new AppError('Failed to merge pull request', 'GITHUB_ERROR', error);
    }
  }

  get isInitialized(): boolean {
    return this.initialized;
  }
}

export const githubClient = GitHubClient.getInstance();