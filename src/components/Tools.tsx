import React from 'react';
import { Wrench, Search, Code, Database, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export function Tools() {
  const tools: Tool[] = [
    {
      id: 'search',
      name: 'Search',
      description: 'Multi-provider search with RAG processing',
      icon: <Search className="w-5 h-5" />,
      action: () => console.log('Search tool clicked')
    },
    {
      id: 'code',
      name: 'Code Analysis',
      description: 'Code awareness and analysis tools',
      icon: <Code className="w-5 h-5" />,
      action: () => console.log('Code tool clicked')
    },
    // Add more tools as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tools.map(tool => (
        <div key={tool.id} className="card p-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              {tool.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          </div>
          <Button 
            onClick={tool.action}
            variant="secondary" 
            className="w-full mt-4"
          >
            Launch
          </Button>
        </div>
      ))}
    </div>
  );
}