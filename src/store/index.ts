import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  activeView: 'chat' | 'canvas' | 'agent' | 'tools' | 'documents' | 'search' | 'settings';
  settingsPanelOpen: boolean;
  sidebarOpen: boolean;
  loggingOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  apiKeys: {
    xai: string;
    groq: string;
    perplexity: string;
    huggingface: string;
    github: string;
    pinecone: string;
  };
  setActiveView: (view: StoreState['activeView']) => void;
  setSettingsPanelOpen: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setLoggingOpen: (open: boolean) => void;
  setTheme: (theme: StoreState['theme']) => void;
  setApiKey: (provider: keyof StoreState['apiKeys'], key: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      activeView: 'chat',
      settingsPanelOpen: false,
      sidebarOpen: true,
      loggingOpen: true,
      theme: 'system',
      apiKeys: {
        xai: '',
        groq: '',
        perplexity: '',
        huggingface: '',
        github: '',
        pinecone: ''
      },
      setActiveView: (view) => set({ activeView: view }),
      setSettingsPanelOpen: (open) => set({ settingsPanelOpen: open }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLoggingOpen: (open) => set({ loggingOpen: open }),
      setTheme: (theme) => set({ theme }),
      setApiKey: (provider, key) => set((state) => ({
        apiKeys: { ...state.apiKeys, [provider]: key }
      }))
    }),
    {
      name: 'gary8-storage',
      partialize: (state) => ({
        theme: state.theme,
        apiKeys: state.apiKeys,
        sidebarOpen: state.sidebarOpen,
        loggingOpen: state.loggingOpen
      })
    }
  )
);