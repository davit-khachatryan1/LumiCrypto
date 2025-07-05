import axios from 'axios';
import { Token, TrendingToken, TokenDetails, AIAnalysis, DeFiProtocol, SearchResult } from './types';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const DEFILLAMA_BASE_URL = 'https://api.llama.fi';

// Create axios instance with rate limiting
const api = axios.create({
  timeout: 10000,
});

// Mock AI API endpoint - replace with actual AI service
const AI_API_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'https://api.openai.com/v1';

export async function fetchTrendingTokens(): Promise<TrendingToken[]> {
  try {
    const response = await api.get(`${COINGECKO_BASE_URL}/search/trending`);
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    // Return mock data for development
    return generateMockTrendingTokens();
  }
}

export async function fetchTokens(
  page: number = 1,
  perPage: number = 100,
  category?: string
): Promise<Token[]> {
  try {
    const params = new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage.toString(),
      page: page.toString(),
      sparkline: 'true',
      price_change_percentage: '24h,7d',
    });

    if (category && category !== 'all') {
      params.append('category', category);
    }

    const response = await api.get(`${COINGECKO_BASE_URL}/coins/markets?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return generateMockTokens();
  }
}

export async function fetchTokenDetails(tokenId: string): Promise<TokenDetails> {
  try {
    const response = await api.get(
      `${COINGECKO_BASE_URL}/coins/${tokenId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token details:', error);
    throw error;
  }
}

export async function searchTokens(query: string): Promise<SearchResult[]> {
  try {
    const response = await api.get(`${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    return response.data.coins.slice(0, 10);
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
}

export async function fetchDeFiProtocols(): Promise<DeFiProtocol[]> {
  try {
    const response = await api.get(`${DEFILLAMA_BASE_URL}/protocols`);
    return response.data.slice(0, 50);
  } catch (error) {
    console.error('Error fetching DeFi protocols:', error);
    return [];
  }
}

export async function generateAIAnalysis(tokenId: string, tokenData: any): Promise<AIAnalysis> {
  try {
    // Mock AI analysis - replace with actual AI service call
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    return generateMockAIAnalysis(tokenData);
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    throw error;
  }
}

export async function generateWalletAIAnalysis(tokens: any[]): Promise<AIAnalysis> {
  try {
    // Mock AI analysis for wallet - replace with actual AI service call
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    return generateMockWalletAIAnalysis(tokens);
  } catch (error) {
    console.error('Error generating wallet AI analysis:', error);
    throw error;
  }
}

// Mock data generators for development
function generateMockTrendingTokens(): TrendingToken[] {
  const mockTokens = [
    { name: 'Bitcoin', symbol: 'BTC', id: 'bitcoin' },
    { name: 'Ethereum', symbol: 'ETH', id: 'ethereum' },
    { name: 'Solana', symbol: 'SOL', id: 'solana' },
    { name: 'Chainlink', symbol: 'LINK', id: 'chainlink' },
    { name: 'Polygon', symbol: 'MATIC', id: 'polygon' },
  ];

  return mockTokens.map((token, index) => ({
    item: {
      id: token.id,
      coin_id: index + 1,
      name: token.name,
      symbol: token.symbol,
      market_cap_rank: index + 1,
      thumb: `https://assets.coingecko.com/coins/images/${index + 1}/thumb/${token.id}.png`,
      small: `https://assets.coingecko.com/coins/images/${index + 1}/small/${token.id}.png`,
      large: `https://assets.coingecko.com/coins/images/${index + 1}/large/${token.id}.png`,
      slug: token.id,
      price_btc: Math.random() * 0.1,
      score: Math.floor(Math.random() * 10),
    },
  }));
}

function generateMockTokens(): Token[] {
  const mockTokens = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
    { id: 'solana', symbol: 'sol', name: 'Solana' },
    { id: 'chainlink', symbol: 'link', name: 'Chainlink' },
    { id: 'polygon', symbol: 'matic', name: 'Polygon' },
  ];

  return mockTokens.map((token, index) => ({
    id: token.id,
    symbol: token.symbol,
    name: token.name,
    image: `https://assets.coingecko.com/coins/images/${index + 1}/large/${token.id}.png`,
    current_price: Math.random() * 50000,
    market_cap: Math.random() * 1000000000000,
    market_cap_rank: index + 1,
    price_change_percentage_24h: (Math.random() - 0.5) * 20,
    price_change_percentage_7d: (Math.random() - 0.5) * 50,
    sparkline_in_7d: {
      price: Array.from({ length: 168 }, () => Math.random() * 100),
    },
    total_volume: Math.random() * 50000000000,
    high_24h: Math.random() * 55000,
    low_24h: Math.random() * 45000,
    circulating_supply: Math.random() * 21000000,
    total_supply: Math.random() * 21000000,
    max_supply: Math.random() * 21000000,
    ath: Math.random() * 70000,
    ath_change_percentage: (Math.random() - 0.5) * 100,
    ath_date: new Date().toISOString(),
    atl: Math.random() * 100,
    atl_change_percentage: Math.random() * 1000,
    atl_date: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  }));
}

function generateMockAIAnalysis(tokenData: any): AIAnalysis {
  const riskScore = Math.floor(Math.random() * 100);
  const sentiments = ['positive', 'negative', 'neutral'] as const;
  const recommendations = ['buy', 'hold', 'sell', 'caution'] as const;

  return {
    summary: `${tokenData.name} is a ${riskScore > 60 ? 'high-risk' : riskScore > 30 ? 'medium-risk' : 'low-risk'} cryptocurrency with ${sentiments[Math.floor(Math.random() * sentiments.length)]} market sentiment. The token has shown ${tokenData.price_change_percentage_24h > 0 ? 'positive' : 'negative'} performance in the last 24 hours with ${Math.abs(tokenData.price_change_percentage_24h).toFixed(2)}% price change.`,
    risk_score: riskScore,
    risk_factors: [
      'Market volatility',
      'Regulatory uncertainty',
      'Liquidity concerns',
      'Technical analysis patterns',
    ].slice(0, Math.floor(Math.random() * 4) + 1),
    strengths: [
      'Strong community support',
      'Active development team',
      'Solid tokenomics',
      'Growing adoption',
    ].slice(0, Math.floor(Math.random() * 4) + 1),
    red_flags: riskScore > 70 ? [
      'Unusual trading patterns',
      'Limited transparency',
      'Centralized control',
    ] : [],
    community_sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    recommendation: recommendations[Math.floor(Math.random() * recommendations.length)],
    confidence: Math.floor(Math.random() * 40) + 60,
  };
}

function generateMockWalletAIAnalysis(tokens: any[]): AIAnalysis {
  const riskScore = Math.floor(Math.random() * 100);
  const totalValue = tokens.reduce((sum, token) => sum + (token.value_usd || 0), 0);

  return {
    summary: `Your portfolio has a total value of $${totalValue.toFixed(2)} with a risk score of ${riskScore}. The portfolio contains ${tokens.length} different tokens with ${riskScore > 60 ? 'high' : riskScore > 30 ? 'moderate' : 'low'} diversification.`,
    risk_score: riskScore,
    risk_factors: [
      'Concentration risk',
      'Market correlation',
      'Volatility exposure',
    ],
    strengths: [
      'Diversified holdings',
      'Long-term potential',
      'Risk management',
    ],
    red_flags: riskScore > 70 ? [
      'Overexposure to high-risk assets',
      'Lack of diversification',
    ] : [],
    community_sentiment: 'neutral',
    recommendation: 'hold',
    confidence: 75,
  };
} 