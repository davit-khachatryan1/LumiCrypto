export interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  sparkline_in_7d: {
    price: number[];
  };
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface TrendingToken {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

export interface TokenDetails extends Token {
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: { usd: number };
    ath_change_percentage: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_change_percentage: { usd: number };
    atl_date: { usd: string };
    last_updated: string;
  };
  community_data: {
    facebook_likes: number;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: number;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
  };
}

export interface AIAnalysis {
  summary: string;
  risk_score: number;
  risk_factors: string[];
  strengths: string[];
  red_flags: string[];
  community_sentiment: 'positive' | 'negative' | 'neutral';
  recommendation: 'buy' | 'hold' | 'sell' | 'caution';
  confidence: number;
}

export interface WalletToken {
  address: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  value_usd: number;
  price_usd: number;
  price_change_24h: number;
  logo_url: string;
}

export interface WalletAnalysis {
  total_value: number;
  risk_score: number;
  diversification_score: number;
  top_holdings: WalletToken[];
  risk_factors: string[];
  recommendations: string[];
  portfolio_distribution: {
    defi: number;
    gaming: number;
    infrastructure: number;
    other: number;
  };
}

export interface ChartData {
  timestamp: number;
  price: number;
  volume: number;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface DeFiProtocol {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  tvl: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  mcap: number;
  category: string;
  chains: string[];
  url: string;
}

export interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
}

export interface CustomAlert {
  id: string;
  userId: string;
  type: 'price' | 'portfolio' | 'market' | 'news';
  name: string;
  description?: string;
  isActive: boolean;
  conditions: AlertCondition[];
  actions: AlertAction[];
  createdAt: string;
  updatedAt: string;
  triggeredAt?: string;
  triggerCount: number;
}

export interface AlertCondition {
  id: string;
  type: 'price_above' | 'price_below' | 'price_change' | 'volume_change' | 'market_cap_change' | 'portfolio_value';
  token?: string;
  value: number;
  timeframe?: '1h' | '24h' | '7d' | '30d';
  operator: 'greater_than' | 'less_than' | 'equals' | 'percentage_change';
}

export interface AlertAction {
  id: string;
  type: 'email' | 'sms' | 'push' | 'webhook';
  enabled: boolean;
  settings: {
    email?: string;
    phone?: string;
    webhookUrl?: string;
    message?: string;
  };
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  webhook: boolean;
  priceAlerts: boolean;
  portfolioUpdates: boolean;
  marketNews: boolean;
  systemUpdates: boolean;
  frequency: 'instant' | 'hourly' | 'daily' | 'weekly';
}

export interface SupportTicket {
  id: string;
  userId: string;
  type: 'technical' | 'billing' | 'feature' | 'bug' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  title: string;
  description: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responseTime?: number;
  resolutionTime?: number;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isStaff: boolean;
  createdAt: string;
  attachments?: string[];
}

export interface UserPlan {
  id: string;
  userId: string;
  planType: 'free' | 'pro' | 'enterprise';
  features: string[];
  limits: {
    tokensPerDay: number;
    alertsLimit: number;
    apiCalls: number;
  };
  supportLevel: 'standard' | 'priority' | 'dedicated';
  createdAt: string;
  expiresAt?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  settings: TeamSettings;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: string[];
  joinedAt: string;
  status: 'active' | 'invited' | 'suspended';
}

export interface TeamSettings {
  whiteLabel: WhiteLabelSettings;
  integrations: TeamIntegration[];
  apiKeys: ApiKey[];
  sla: SLASettings;
}

export interface WhiteLabelSettings {
  enabled: boolean;
  brandName: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  customDomain?: string;
  hideFooter: boolean;
  customCSS?: string;
}

export interface TeamIntegration {
  id: string;
  type: 'webhook' | 'slack' | 'discord' | 'teams' | 'api';
  name: string;
  url: string;
  enabled: boolean;
  settings: Record<string, any>;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
  lastUsed?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface SLASettings {
  responseTime: number; // in minutes
  resolutionTime: number; // in hours
  availabilityTarget: number; // percentage
  monitoring: boolean;
}

export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    tokensPerMonth: number;
    alertsLimit: number;
    teamsLimit: number;
    apiCallsLimit: number;
  };
}

export interface UserSubscription {
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface FeatureAccess {
  canUseFeature: boolean;
  reason?: string;
  upgradeRequired?: boolean;
  planRequired?: string;
}

export interface UsageLimits {
  tokensAnalyzed: number;
  alertsCreated: number;
  teamsCreated: number;
  apiCallsMade: number;
} 