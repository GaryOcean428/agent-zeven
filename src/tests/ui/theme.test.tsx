import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../components/theme-provider';

describe('Theme Provider', () => {
  it('should render children with theme context', () => {
    const { container } = render(
      <ThemeProvider>
        <div className="bg-background text-foreground">
          Test content
        </div>
      </ThemeProvider>
    );

    expect(container).toBeTruthy();
    expect(container.firstChild).toHaveClass('bg-background', 'text-foreground');
  });
}); 