import { components } from '@octokit/openapi-types';

export type Repository = components['schemas']['repository'];
export type Branch = components['schemas']['branch'];
export type PullRequest = components['schemas']['pull-request'];

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