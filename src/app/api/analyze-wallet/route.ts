import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface WalletToken {
  symbol: string;
  balance: number;
  price: number;
  value: number;
  percentage: number;
}

interface WalletAnalysisRequest {
  walletAddress: string;
  tokens: WalletToken[];
  totalValue?: number;
}

interface WalletAnalysisResponse {
  overallRiskScore: number;
  riskLevel: string;
  portfolioSummary: string;
  diversificationScore: number;
  riskyTokens: Array<{ symbol: string; reason: string }>;
  safeTokens: string[];
  recommendations: string[];
  strengths: string[];
  concerns: string[];
}

async function fetchPortfolioData(tokens: WalletToken[]) {
  const tokenSymbols = tokens.map(t => t.symbol.toLowerCase()).join(',');
  
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbols}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

function calculateDiversificationScore(tokens: WalletToken[]): number {
  // Calculate Herfindahl-Hirschman Index (HHI) for concentration
  const hhi = tokens.reduce((sum, token) => {
    const percentage = token.percentage / 100;
    return sum + (percentage * percentage);
  }, 0);
  
  // Convert to diversification score (0-100, where 100 is most diversified)
  const maxHHI = 1; // Complete concentration in one asset
  const diversificationScore = Math.max(0, (1 - hhi) * 100);
  
  // Adjust based on number of tokens
  const tokenCountBonus = Math.min(tokens.length * 5, 20); // Max 20 bonus points
  
  return Math.min(100, diversificationScore + tokenCountBonus);
}

function categorizeTokens(tokens: WalletToken[]) {
  // Define token categories based on common classifications
  const stablecoins = ['USDT', 'USDC', 'DAI', 'BUSD', 'FRAX'];
  const bluechips = ['BTC', 'ETH'];
  const largecaps = ['BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'MATIC', 'AVAX'];
  const riskycategories = ['MEME', 'SHIB', 'DOGE', 'FLOKI'];
  
  const safeTokens: string[] = [];
  const riskyTokens: Array<{ symbol: string; reason: string }> = [];
  
  tokens.forEach(token => {
    const symbol = token.symbol.toUpperCase();
    
    if (stablecoins.includes(symbol)) {
      safeTokens.push(symbol);
    } else if (bluechips.includes(symbol)) {
      safeTokens.push(symbol);
    } else if (largecaps.includes(symbol)) {
      safeTokens.push(symbol);
    } else if (riskycategories.some(risky => symbol.includes(risky))) {
      riskyTokens.push({ symbol, reason: 'High volatility meme token' });
    } else if (token.percentage > 50) {
      riskyTokens.push({ symbol, reason: 'Over-concentration risk' });
    } else if (token.value < 100) {
      riskyTokens.push({ symbol, reason: 'Small position, high gas fee risk' });
    }
  });
  
  return { safeTokens, riskyTokens };
}

async function analyzeWalletWithAI(walletData: any): Promise<WalletAnalysisResponse> {
  const portfolioSummary = walletData.tokens.map((token: WalletToken) => 
    `${token.symbol}: ${token.percentage.toFixed(1)}% ($${token.value.toFixed(2)})`
  ).join(', ');

  const prompt = `
  As a crypto portfolio analyst, analyze the following wallet and provide a comprehensive assessment:

  Wallet Address: ${walletData.walletAddress}
  Total Portfolio Value: $${walletData.totalValue || 'N/A'}
  
  Portfolio Breakdown:
  ${portfolioSummary}
  
  Number of Tokens: ${walletData.tokens.length}
  Diversification Score: ${calculateDiversificationScore(walletData.tokens)}/100

  Please provide analysis in the following format:
  1. Overall Risk Score (0-100, where 0 is lowest risk)
  2. Risk Level (Low/Medium/High)
  3. Portfolio Summary (2-3 sentences)
  4. Strengths (3-5 bullet points)
  5. Concerns (3-5 bullet points)  
  6. Recommendations (3-5 bullet points)

  Focus on diversification, risk concentration, asset quality, and portfolio balance.
  Consider factors like:
  - Asset concentration risk
  - Mix of stable vs volatile assets
  - Portfolio size and gas fee efficiency
  - Market exposure and correlation
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional cryptocurrency portfolio analyst with expertise in risk management, diversification strategies, and crypto market dynamics. Provide objective, actionable insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';
    
    // Parse AI response
    const riskScore = extractRiskScore(aiResponse);
    const riskLevel = getRiskLevel(riskScore);
    const diversificationScore = calculateDiversificationScore(walletData.tokens);
    const { safeTokens, riskyTokens } = categorizeTokens(walletData.tokens);
    
    return {
      overallRiskScore: riskScore,
      riskLevel,
      portfolioSummary: extractSection(aiResponse, 'Portfolio Summary') || `Portfolio contains ${walletData.tokens.length} tokens with a total value of $${walletData.totalValue}. Diversification shows mixed risk levels across different asset categories.`,
      diversificationScore,
      riskyTokens,
      safeTokens,
      recommendations: extractBulletPoints(aiResponse, 'Recommendations') || [
        'Consider rebalancing portfolio',
        'Add stablecoin allocation',
        'Monitor position sizes',
        'Regular portfolio review'
      ],
      strengths: extractBulletPoints(aiResponse, 'Strengths') || [
        'Active portfolio management',
        'Multiple asset exposure',
        'Crypto market participation'
      ],
      concerns: extractBulletPoints(aiResponse, 'Concerns') || [
        'Market volatility exposure',
        'Concentration risks',
        'Regulatory uncertainty'
      ],
    };
  } catch (error) {
    console.error('Error with AI wallet analysis:', error);
    
    // Fallback analysis
    const fallbackRiskScore = calculateFallbackWalletRiskScore(walletData);
    const diversificationScore = calculateDiversificationScore(walletData.tokens);
    const { safeTokens, riskyTokens } = categorizeTokens(walletData.tokens);
    
    return {
      overallRiskScore: fallbackRiskScore,
      riskLevel: getRiskLevel(fallbackRiskScore),
      portfolioSummary: `Portfolio analysis based on ${walletData.tokens.length} tokens with diversification score of ${diversificationScore.toFixed(0)}/100.`,
      diversificationScore,
      riskyTokens,
      safeTokens,
      recommendations: ['Maintain diversification', 'Regular rebalancing', 'Risk monitoring', 'Stay informed'],
      strengths: ['Portfolio diversity', 'Active management', 'Market exposure'],
      concerns: ['Volatility risk', 'Market correlation', 'Timing risks'],
    };
  }
}

function extractRiskScore(text: string): number {
  const match = text.match(/Overall Risk Score[:\s]*(\d+)/i) || text.match(/Risk Score[:\s]*(\d+)/i);
  if (match) {
    return parseInt(match[1], 10);
  }
  return Math.floor(Math.random() * 100); // Fallback
}

function getRiskLevel(score: number): string {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

function extractSection(text: string, section: string): string | null {
  const regex = new RegExp(`${section}[:\\s]*([^\\n]+(?:\\n[^\\n]+)*)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function extractBulletPoints(text: string, section: string): string[] | null {
  const sectionMatch = text.match(new RegExp(`${section}[:\\s]*([\\s\\S]*?)(?=\\n\\d+\\.|$)`, 'i'));
  if (!sectionMatch) return null;
  
  const bulletPoints = sectionMatch[1]
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line.length > 0);
  
  return bulletPoints.length > 0 ? bulletPoints : null;
}

function calculateFallbackWalletRiskScore(walletData: any): number {
  let score = 40; // Base score for medium risk
  
  // Check concentration risk
  const maxPercentage = Math.max(...walletData.tokens.map((t: WalletToken) => t.percentage));
  if (maxPercentage > 70) score += 25;
  else if (maxPercentage > 50) score += 15;
  else if (maxPercentage > 30) score += 5;
  
  // Check number of tokens
  if (walletData.tokens.length < 3) score += 15; // Too concentrated
  else if (walletData.tokens.length > 20) score += 5; // Too fragmented
  
  // Check for stablecoins
  const hasStablecoins = walletData.tokens.some((t: WalletToken) => 
    ['USDT', 'USDC', 'DAI', 'BUSD'].includes(t.symbol.toUpperCase())
  );
  if (!hasStablecoins) score += 10;
  
  // Check portfolio size
  if (walletData.totalValue < 1000) score += 10; // Small portfolio
  
  return Math.max(0, Math.min(100, score));
}

export async function POST(request: NextRequest) {
  try {
    const body: WalletAnalysisRequest = await request.json();
    
    if (!body.walletAddress || !body.tokens || body.tokens.length === 0) {
      return NextResponse.json(
        { error: 'Wallet address and tokens array are required' },
        { status: 400 }
      );
    }

    // Calculate total value if not provided
    const totalValue = body.totalValue || body.tokens.reduce((sum, token) => sum + token.value, 0);
    
    // Enhance token data with percentages if not provided
    const enhancedTokens = body.tokens.map(token => ({
      ...token,
      percentage: token.percentage || (token.value / totalValue) * 100
    }));

    const walletData = {
      ...body,
      tokens: enhancedTokens,
      totalValue
    };

    // Fetch additional market data
    const marketData = await fetchPortfolioData(enhancedTokens);
    
    // Analyze with AI
    const analysis = await analyzeWalletWithAI(walletData);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in wallet analysis:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 