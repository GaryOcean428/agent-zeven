import React from 'react';

export function Loading({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${className}`} />
    </div>
  );
} 