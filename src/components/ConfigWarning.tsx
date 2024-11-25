import React from 'react';
import { AlertTriangle, Settings } from 'lucide-react';
import { useStore } from '../store';
import { useConfig } from '../providers/ConfigProvider';

export function ConfigWarning() {
  const { setSettingsPanelOpen } = useStore();
  const { missingKeys } = useConfig();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <div className="flex items-center space-x-2 text-yellow-500">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Configuration Required</h2>
        </div>
        <p className="text-muted-foreground">
          Please configure your API keys in the settings panel to continue. The following keys are missing:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {missingKeys.map(key => (
            <li key={key} className="text-muted-foreground">
              {key.toUpperCase().replace('VITE_', '').replace('_', ' ')} API Key
            </li>
          ))}
        </ul>
        <button
          onClick={() => setSettingsPanelOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Open Settings</span>
        </button>
      </div>
    </div>
  );
}