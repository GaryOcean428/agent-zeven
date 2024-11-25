import React, { createContext, useContext, useEffect, useState } from 'react';
import { config, validateApiKeys } from '../lib/config';
import { thoughtLogger } from '../lib/logging/thought-logger';
import { useStore } from '../store';

interface ConfigContextType {
  isInitialized: boolean;
  hasValidConfig: boolean;
  missingKeys: string[];
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasValidConfig, setHasValidConfig] = useState(false);
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const { setSettingsPanelOpen } = useStore();

  useEffect(() => {
    const checkConfig = () => {
      const { valid, missingKeys } = validateApiKeys();
      
      if (!valid) {
        thoughtLogger.log('warning', 'Missing required API keys', { missingKeys });
        setSettingsPanelOpen(true);
      }

      setHasValidConfig(valid);
      setMissingKeys(missingKeys);
      setIsInitialized(true);
    };

    checkConfig();
  }, [setSettingsPanelOpen]);

  return (
    <ConfigContext.Provider value={{ isInitialized, hasValidConfig, missingKeys }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}