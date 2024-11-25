import { components } from '@octokit/openapi-types';

export type Repository = components['schemas']['repository'];
export type Branch = components['schemas']['branch'];
export type PullRequest = components['schemas']['pull-request'];

export interface APIResponse<T> {
  data: T;
  status: number;
  statusCode?: number;
  response?: unknown;
}

export interface APIError extends Error {
  statusCode: number;
  response: unknown;
  details?: unknown;
}

export interface FileChange {
  path: string;
  content: string;
  encoding?: 'utf-8' | 'base64';
}

export interface CommitOptions {
  message: string;
  branch?: string;
  author?: {
    name: string;
    email: string;
  };
}

export interface GitHubClientConfig {
  auth: string;
  baseUrl: string;
  headers: {
    'X-GitHub-Api-Version': string;
    [key: string]: string;
  };
}

export interface CodespaceInfo {
  repository?: string;
  name?: string;
  owner?: string;
  machine?: {
    cpus: number;
    memory: number;
    storage: number;
  };
  status?: 'Available' | 'Busy' | 'Failed';
  gitStatus?: {
    ahead: number;
    behind: number;
    hasUncommittedChanges: boolean;
  };
}