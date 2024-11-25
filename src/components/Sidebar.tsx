import React from 'react';
import { MessageSquare, Paintbrush, Brain, Wrench, FileText, Settings, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import type { ActivePanel } from '../App';

interface SidebarProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
}

export function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const navItems = [
    { id: 'chat' as const, icon: MessageSquare, label: 'Chat', primary: true },
    { id: 'canvas' as const, icon: Paintbrush, label: 'Canvas' },
    { id: 'agent' as const, icon: Brain, label: 'Agent' },
    { id: 'tools' as const, icon: Wrench, label: 'Tools' },
    { id: 'documents' as const, icon: FileText, label: 'Documents' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-background border-r border-border flex flex-col h-full">
      <div className="flex-1 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors',
                activePanel === item.id
                  ? item.primary 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>
    </div>
  );
}