import { create } from 'zustand';
import { Token, AIAnalysis } from './types';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Tokens
  tokens: Token[];
  setTokens: (tokens: Token[]) => void;
  selectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Token[];
  setSearchResults: (results: Token[]) => void;

  // AI Analysis
  aiAnalysis: AIAnalysis | null;
  setAiAnalysis: (analysis: AIAnalysis | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;

  // Favorites
  favorites: string[];
  addToFavorites: (tokenId: string) => void;
  removeFromFavorites: (tokenId: string) => void;
  isFavorite: (tokenId: string) => boolean;

  // Filters
  filters: {
    chain: string;
    category: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  setFilters: (filters: Partial<AppState['filters']>) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  // Tokens
  tokens: [],
  setTokens: (tokens) => set({ tokens }),
  selectedToken: null,
  setSelectedToken: (token) => set({ selectedToken: token }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  // AI Analysis
  aiAnalysis: null,
  setAiAnalysis: (analysis) => set({ aiAnalysis: analysis }),
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),

  // Favorites
  favorites: [],
  addToFavorites: (tokenId) => {
    const { favorites } = get();
    if (!favorites.includes(tokenId)) {
      set({ favorites: [...favorites, tokenId] });
    }
  },
  removeFromFavorites: (tokenId) => {
    const { favorites } = get();
    set({ favorites: favorites.filter(id => id !== tokenId) });
  },
  isFavorite: (tokenId) => {
    const { favorites } = get();
    return favorites.includes(tokenId);
  },

  // Filters
  filters: {
    chain: 'all',
    category: 'all',
    sortBy: 'market_cap',
    sortOrder: 'desc',
  },
  setFilters: (newFilters) => {
    const { filters } = get();
    set({ filters: { ...filters, ...newFilters } });
  },

  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  loadingMessage: '',
  setLoadingMessage: (message) => set({ loadingMessage: message }),
})); 