import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Token, AIAnalysis, BillingPlan, UserSubscription, FeatureAccess, UsageLimits } from './types';

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
  theme: 'light',
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

// Billing Plans Configuration
export const BILLING_PLANS: BillingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    interval: 'monthly',
    features: [
      'Basic token analysis',
      'Limited portfolio tracking (5 tokens)',
      'Basic market data',
      'Community support'
    ],
    limits: {
      tokensPerMonth: 50,
      alertsLimit: 3,
      teamsLimit: 0,
      apiCallsLimit: 100
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'monthly',
    features: [
      'Unlimited token analysis',
      'Advanced AI insights',
      'Portfolio tracking unlimited tokens',
      'Priority support',
      'Custom alerts',
      'API access',
      'Export data'
    ],
    limits: {
      tokensPerMonth: -1, // unlimited
      alertsLimit: 50,
      teamsLimit: 1,
      apiCallsLimit: 10000
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'monthly',
    features: [
      'Everything in Pro',
      'White-label solutions',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom AI models',
      'Multi-team access'
    ],
    limits: {
      tokensPerMonth: -1, // unlimited
      alertsLimit: -1, // unlimited
      teamsLimit: -1, // unlimited
      apiCallsLimit: -1 // unlimited
    }
  }
];

// Billing Store
interface BillingState {
  currentPlan: BillingPlan;
  subscription: UserSubscription | null;
  usage: UsageLimits;
  setCurrentPlan: (planId: string) => void;
  setSubscription: (subscription: UserSubscription | null) => void;
  updateUsage: (usage: Partial<UsageLimits>) => void;
  checkFeatureAccess: (feature: string) => FeatureAccess;
  canCreateAlert: () => boolean;
  canCreateTeam: () => boolean;
  canUseAPI: () => boolean;
  getRemainingLimits: () => {
    tokens: number;
    alerts: number;
    teams: number;
    apiCalls: number;
  };
}

export const useBillingStore = create<BillingState>()(
  persist(
    (set, get) => ({
      currentPlan: BILLING_PLANS[0], // default to basic
      subscription: null,
      usage: {
        tokensAnalyzed: 0,
        alertsCreated: 0,
        teamsCreated: 0,
        apiCallsMade: 0
      },

      setCurrentPlan: (planId) => {
        const plan = BILLING_PLANS.find(p => p.id === planId);
        if (plan) {
          set({ currentPlan: plan });
        }
      },

      setSubscription: (subscription) => set({ subscription }),

      updateUsage: (newUsage) => {
        const { usage } = get();
        set({ usage: { ...usage, ...newUsage } });
      },

      checkFeatureAccess: (feature) => {
        const { currentPlan } = get();
        
        // Define feature requirements
        const featureRequirements: Record<string, string> = {
          'advanced-ai': 'pro',
          'unlimited-tokens': 'pro',
          'priority-support': 'pro',
          'custom-alerts': 'pro',
          'api-access': 'pro',
          'export-data': 'pro',
          'white-label': 'enterprise',
          'custom-integrations': 'enterprise',
          'dedicated-manager': 'enterprise',
          'sla-guarantee': 'enterprise',
          'custom-ai-models': 'enterprise',
          'multi-team-access': 'enterprise'
        };

        const requiredPlan = featureRequirements[feature];
        
        if (!requiredPlan) {
          return { canUseFeature: true };
        }

        const planHierarchy = ['basic', 'pro', 'enterprise'];
        const currentPlanLevel = planHierarchy.indexOf(currentPlan.id);
        const requiredPlanLevel = planHierarchy.indexOf(requiredPlan);

        if (currentPlanLevel >= requiredPlanLevel) {
          return { canUseFeature: true };
        }

        return {
          canUseFeature: false,
          reason: `This feature requires ${requiredPlan} plan or higher`,
          upgradeRequired: true,
          planRequired: requiredPlan
        };
      },

      canCreateAlert: () => {
        const { currentPlan, usage } = get();
        if (currentPlan.limits.alertsLimit === -1) return true;
        return usage.alertsCreated < currentPlan.limits.alertsLimit;
      },

      canCreateTeam: () => {
        const { currentPlan, usage } = get();
        if (currentPlan.limits.teamsLimit === -1) return true;
        return usage.teamsCreated < currentPlan.limits.teamsLimit;
      },

      canUseAPI: () => {
        const { currentPlan, usage } = get();
        if (currentPlan.limits.apiCallsLimit === -1) return true;
        return usage.apiCallsMade < currentPlan.limits.apiCallsLimit;
      },

      getRemainingLimits: () => {
        const { currentPlan, usage } = get();
        return {
          tokens: currentPlan.limits.tokensPerMonth === -1 ? -1 : Math.max(0, currentPlan.limits.tokensPerMonth - usage.tokensAnalyzed),
          alerts: currentPlan.limits.alertsLimit === -1 ? -1 : Math.max(0, currentPlan.limits.alertsLimit - usage.alertsCreated),
          teams: currentPlan.limits.teamsLimit === -1 ? -1 : Math.max(0, currentPlan.limits.teamsLimit - usage.teamsCreated),
          apiCalls: currentPlan.limits.apiCallsLimit === -1 ? -1 : Math.max(0, currentPlan.limits.apiCallsLimit - usage.apiCallsMade)
        };
      }
    }),
    {
      name: 'billing-storage',
      version: 1,
    }
  )
);