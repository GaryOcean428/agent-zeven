import { Octokit } from 'octokit';
import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';
import { decodeBase64 } from '../../utils/base64';
import { RateLimiter } from '../api/rate-limiter';
import type { Endpoints } from '@octokit/types';

type CreateRepositoryResponse = Endpoints['POST /user/repos']['response']['data'];
type GetRepositoryResponse = Endpoints['GET /repos/{owner}/{repo}']['response']['data'];
type ListRepositoriesResponse = Endpoints['GET /user/repos']['response']['data'];
type CreatePullRequestResponse = Endpoints['POST /repos/{owner}/{repo}/pulls']['response']['data'];

interface CreateRepositoryOptions extends Record<string, any> {
  name: string;
  description?: string;
  private?: boolean;
  auto_init?: boolean;
}

interface CreateOrUpdateFileParams extends Record<string, any> {
  owner: string;
  repo: string;
  path: string;
  message: string;
  content: string;
  sha?: string;
  branch?: string;
}

interface PullRequestParams extends Record<string, any> {
  owner: string;
  repo: string;
  title: string;
  head: string;
  base: string;
  body?: string;
}

interface MergePullRequestParams extends Record<string, any> {
  owner: string;
  repo: string;
  pull_number: number;
  commit_title?: string;
  commit_message?: string;
  merge_method?: 'merge' | 'squash' | 'rebase';
}

// GitHub configuration
const GITHUB_CONFIG = {
  baseUrl: 'https://api.github.com',
  apiVersion: '2022-11-28',
  token: import.meta.env.VITE_GITHUB_TOKEN || ''
} as const;

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

    if (!GITHUB_CONFIG.token) {
      thoughtLogger.log('error', 'GitHub API key not configured');
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
      if (!GITHUB_CONFIG.token) {
        throw new AppError('GitHub API key not configured', 'CONFIG_ERROR');
      }

      this.octokit = new Octokit({
        auth: GITHUB_CONFIG.token,
        baseUrl: GITHUB_CONFIG.baseUrl,
        headers: {
          'X-GitHub-Api-Version': GITHUB_CONFIG.apiVersion
        }
      });

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

  async listRepositories(options: Record<string, any> = {}): Promise<ListRepositoriesResponse> {
    if (!this.initialized) await this.initialize();
    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.listForAuthenticatedUser(options);
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to list repositories', { error });
      throw new AppError('Failed to list repositories', 'GITHUB_ERROR', error);
    }
  }

  async getRepository(owner: string, repo: string): Promise<GetRepositoryResponse> {
    if (!this.initialized) await this.initialize();
    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.get({ owner, repo });
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get repository', { error });
      throw new AppError('Failed to get repository', 'GITHUB_ERROR', error);
    }
  }

  async createRepository(options: CreateRepositoryOptions): Promise<CreateRepositoryResponse> {
    if (!this.initialized) await this.initialize();
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
    if (!this.initialized) await this.initialize();
    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.repos.getContent({
        owner,
        repo,
        path
      });

      if ('content' in data) {
        return decodeBase64(data.content);
      }
      throw new Error('Not a file');
    } catch (error) {
      thoughtLogger.log('error', 'Failed to get file content', { error });
      throw new AppError('Failed to get file content', 'GITHUB_ERROR', error);
    }
  }

  async createOrUpdateFile(params: CreateOrUpdateFileParams): Promise<void> {
    if (!this.initialized) await this.initialize();
    await this.rateLimiter.acquire();

    try {
      await this.octokit!.rest.repos.createOrUpdateFileContents(params);
    } catch (error) {
      thoughtLogger.log('error', 'Failed to create/update file', { error });
      throw new AppError('Failed to create/update file', 'GITHUB_ERROR', error);
    }
  }

  async createPullRequest(params: PullRequestParams): Promise<CreatePullRequestResponse> {
    if (!this.initialized) await this.initialize();
    await this.rateLimiter.acquire();

    try {
      const { data } = await this.octokit!.rest.pulls.create(params);
      return data;
    } catch (error) {
      thoughtLogger.log('error', 'Failed to create pull request', { error });
      throw new AppError('Failed to create pull request', 'GITHUB_ERROR', error);
    }
  }

  async mergePullRequest(params: MergePullRequestParams): Promise<void> {
    if (!this.initialized) await this.initialize();
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
