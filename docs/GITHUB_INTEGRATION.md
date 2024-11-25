# GitHub Integration Guide

## Configuration

### Environment Variables
```env
VITE_GITHUB_TOKEN=your_github_token_here
```

### Required Scopes
- repo (full repository access)
- workflow (Actions access)
- read:org (Organization access)
- read:user (User data access)
- codespace (Codespace operations)

## API Operations

### Repository Operations
```typescript
// List repositories
const repos = await github.listRepositories({
  type: 'all',
  sort: 'updated'
});

// Get repository
const repo = await github.getRepository(owner, repo);

// Create repository
const newRepo = await github.createRepository({
  name: 'my-repo',
  private: true
});
```

### File Operations
```typescript
// Get file content
const content = await github.getFileContent(owner, repo, path);

// Create/update file
await github.createOrUpdateFile({
  owner,
  repo,
  path: 'src/main.ts',
  content: 'console.log("Hello");',
  message: 'Update main.ts'
});
```

### Branch Management
```typescript
// List branches
const branches = await github.listBranches(owner, repo);

// Create branch
await github.createBranch({
  owner,
  repo,
  branch: 'feature/new-feature',
  sha: 'main-branch-sha'
});
```

### Pull Requests
```typescript
// Create PR
const pr = await github.createPullRequest({
  owner,
  repo,
  title: 'Add new feature',
  head: 'feature/new-feature',
  base: 'main'
});

// Merge PR
await github.mergePullRequest({
  owner,
  repo,
  pull_number: pr.number,
  merge_method: 'squash'
});
```

## Error Handling

```typescript
try {
  await github.someOperation();
} catch (error) {
  if (error instanceof AppError) {
    switch (error.code) {
      case 'GITHUB_ERROR':
        // Handle GitHub API errors
        break;
      case 'AUTH_ERROR':
        // Handle authentication errors
        break;
      case 'RATE_LIMIT':
        // Handle rate limiting
        break;
    }
  }
}
```

## Rate Limiting

Built-in rate limit handling:
- Automatic retries (up to 3 times)
- Exponential backoff
- Secondary rate limit handling
- Request throttling

## Best Practices

1. **Authentication**
   - Store token securely in .env
   - Never commit tokens
   - Rotate tokens regularly

2. **Error Handling**
   - Always use try/catch
   - Handle rate limits gracefully
   - Log errors appropriately

3. **Performance**
   - Use pagination for large lists
   - Cache responses when appropriate
   - Batch operations when possible

4. **Security**
   - Validate input parameters
   - Use minimal required scopes
   - Handle sensitive data properly

## Testing

### Unit Tests
```typescript
describe('GitHubClient', () => {
  it('should list repositories', async () => {
    const repos = await github.listRepositories();
    expect(Array.isArray(repos)).toBe(true);
  });

  it('should handle file operations', async () => {
    const content = await github.getFileContent(owner, repo, 'README.md');
    expect(typeof content).toBe('string');
  });
});
```

### Integration Tests
```typescript
describe('GitHub Integration', () => {
  it('should perform end-to-end repository operations', async () => {
    // Create repository
    const repo = await github.createRepository({
      name: 'test-repo',
      private: true
    });

    // Create file
    await github.createOrUpdateFile({
      owner: repo.owner.login,
      repo: repo.name,
      path: 'README.md',
      content: '# Test Repository',
      message: 'Initial commit'
    });

    // Verify file
    const content = await github.getFileContent(
      repo.owner.login,
      repo.name,
      'README.md'
    );
    expect(content).toContain('Test Repository');
  });
});
```

## Troubleshooting

1. **Authentication Issues**
   - Verify token in .env
   - Check token scopes
   - Ensure token is not expired

2. **Rate Limiting**
   - Check rate limit status
   - Use conditional requests
   - Implement caching

3. **Operation Failures**
   - Check error messages
   - Verify permissions
   - Review API logs

## Example Usage

```typescript
import { GitHubClient } from './lib/github/github-client';
import { CodespaceClient } from './lib/github/codespace-client';

// Initialize clients
const github = GitHubClient.getInstance();
const codespace = CodespaceClient.getInstance();

// Repository operations
async function createFeature() {
  try {
    // Get repository
    const repo = await github.getRepository('owner', 'repo');
    
    // Create branch
    await github.createBranch({
      owner: repo.owner.login,
      repo: repo.name,
      branch: 'feature/new-feature',
      sha: repo.default_branch
    });
    
    // Create/update files
    await github.createOrUpdateFile({
      owner: repo.owner.login,
      repo: repo.name,
      path: 'src/feature.ts',
      content: 'export const newFeature = () => {};',
      message: 'Add new feature',
      branch: 'feature/new-feature'
    });
    
    // Create pull request
    const pr = await github.createPullRequest({
      owner: repo.owner.login,
      repo: repo.name,
      title: 'Add new feature',
      head: 'feature/new-feature',
      base: repo.default_branch
    });
    
    return pr;
  } catch (error) {
    console.error('Failed to create feature:', error);
    throw error;
  }
}
```