import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { ToastProvider } from './providers/ToastProvider';
import { SettingsProvider } from './providers/SettingsProvider';
import { ConfigProvider } from './providers/ConfigProvider';
import { SearchProvider } from './context/SearchContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initializeSystem } from './lib/initialize';
import { useToast } from './hooks/useToast';
import { Chat } from './components/Chat';
import { Canvas } from './components/Canvas';
import { Agent } from './components/Agent';
import { Tools } from './components/Tools';
import { Documents } from './components/Documents';
import { Settings } from './components/Settings';
import { SearchPanel } from './components/panels/SearchPanel';
import { AIProvider } from './components/providers/AIProvider';

export const ActivePanel = {
  CHAT: 'chat',
  CANVAS: 'canvas',
  AGENT: 'agent',
  TOOLS: 'tools',
  DOCUMENTS: 'documents',
  SEARCH: 'search',
  SETTINGS: 'settings'
};

function AppContent() {
  const [activePanel, setActivePanel] = useState(ActivePanel.CHAT);
  const [isInitialized, setIsInitialized] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const init = async () => {
      try {
        const success = await initializeSystem();
        if (success) {
          setIsInitialized(true);
          addToast({
            type: 'success',
            message: 'System initialized successfully'
          });
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Initialization Error',
          message: error instanceof Error ? error.message : 'Failed to initialize system'
        });
        setIsInitialized(true);
      }
    };

    init();
  }, [addToast]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Initializing system...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout activePanel={activePanel} onPanelChange={setActivePanel}>
      <div className="h-full">
        {(() => {
          switch (activePanel) {
            case ActivePanel.CHAT:
              return <Chat />;
            case ActivePanel.CANVAS:
              return <Canvas />;
            case ActivePanel.AGENT:
              return <Agent />;
            case ActivePanel.TOOLS:
              return <Tools />;
            case ActivePanel.DOCUMENTS:
              return <Documents />;
            case ActivePanel.SEARCH:
              return <SearchPanel />;
            case ActivePanel.SETTINGS:
              return <Settings />;
            default:
              return <Chat />;
          }
        })()}
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ConfigProvider>
          <SettingsProvider>
            <SearchProvider>
              <AIProvider>
                <AppContent />
              </AIProvider>
            </SearchProvider>
          </SettingsProvider>
        </ConfigProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
