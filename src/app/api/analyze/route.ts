import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TokenAnalysisRequest {
  tokenName: string;
  symbol: string;
  price?: number;
  marketCap?: number;
  tvl?: number;
  description?: string;
  volume24h?: number;
  priceChange24h?: number;
  holders?: number;
}

interface TokenAnalysisResponse {
  riskScore: number;
  riskLevel: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  priceAnalysis: string;
  marketAnalysis: string;
}

async function fetchTokenData(symbol: string) {
  try {
    // Fetch from CoinGecko API
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch token data');
    }
    
    const data = await response.json();
    return {
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      price: data.market_data?.current_price?.usd || 0,
      marketCap: data.market_data?.market_cap?.usd || 0,
      volume24h: data.market_data?.total_volume?.usd || 0,
      priceChange24h: data.market_data?.price_change_percentage_24h || 0,
      description: data.description?.en || '',
      totalSupply: data.market_data?.total_supply || 0,
      circulatingSupply: data.market_data?.circulating_supply || 0,
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
}

async function fetchDeFiData(symbol: string) {
  try {
    // Fetch from DeFiLlama API
    const response = await fetch(
      `https://api.llama.fi/protocol/${symbol.toLowerCase()}`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return {
      tvl: data.tvl || 0,
      category: data.category || 'Unknown',
      chains: data.chains || [],
    };
  } catch (error) {
    console.error('Error fetching DeFi data:', error);
    return null;
  }
}

async function analyzeTokenWithAI(tokenData: any): Promise<TokenAnalysisResponse> {
  const prompt = `
  As a crypto analyst, analyze the following token and provide a comprehensive assessment:

  Token: ${tokenData.tokenName} (${tokenData.symbol})
  Current Price: $${tokenData.price || 'N/A'}
  Market Cap: $${tokenData.marketCap || 'N/A'}
  24h Volume: $${tokenData.volume24h || 'N/A'}
  24h Price Change: ${tokenData.priceChange24h || 'N/A'}%
  TVL: $${tokenData.tvl || 'N/A'}
  Description: ${tokenData.description || 'N/A'}

  Please provide analysis in the following format:
  1. Risk Score (0-100, where 0 is lowest risk)
  2. Risk Level (Low/Medium/High)
  3. Summary (2-3 sentences)
  4. Strengths (3-5 bullet points)
  5. Weaknesses (3-5 bullet points)
  6. Recommendations (3-5 bullet points)
  7. Price Analysis (2-3 sentences)
  8. Market Analysis (2-3 sentences)

  Focus on fundamentals, technology, adoption, market position, and regulatory risks.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional cryptocurrency analyst with expertise in blockchain technology, tokenomics, and market analysis. Provide objective, data-driven insights."
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
    
    // Parse AI response (simplified parsing - in production, use more robust parsing)
    const riskScore = extractRiskScore(aiResponse);
    const riskLevel = getRiskLevel(riskScore);
    
    return {
      riskScore,
      riskLevel,
      summary: extractSection(aiResponse, 'Summary') || `${tokenData.tokenName} is a ${tokenData.symbol} token with current market dynamics showing mixed signals based on recent performance and market conditions.`,
      strengths: extractBulletPoints(aiResponse, 'Strengths') || [
        'Established market presence',
        'Active trading volume',
        'Community support'
      ],
      weaknesses: extractBulletPoints(aiResponse, 'Weaknesses') || [
        'Market volatility',
        'Regulatory uncertainty',
        'Competition risks'
      ],
      recommendations: extractBulletPoints(aiResponse, 'Recommendations') || [
        'Monitor market trends',
        'Diversify portfolio',
        'Stay informed about developments'
      ],
      priceAnalysis: extractSection(aiResponse, 'Price Analysis') || 'Current price levels reflect market sentiment and trading activity.',
      marketAnalysis: extractSection(aiResponse, 'Market Analysis') || 'Market position shows typical cryptocurrency volatility patterns.',
    };
  } catch (error) {
    console.error('Error with AI analysis:', error);
    
    // Fallback analysis
    const fallbackRiskScore = calculateFallbackRiskScore(tokenData);
    return {
      riskScore: fallbackRiskScore,
      riskLevel: getRiskLevel(fallbackRiskScore),
      summary: `${tokenData.tokenName} analysis based on available market data and technical indicators.`,
      strengths: ['Active trading', 'Market presence', 'Liquidity'],
      weaknesses: ['Volatility', 'Market dependency', 'Regulatory risks'],
      recommendations: ['Monitor closely', 'Diversify holdings', 'Stay updated'],
      priceAnalysis: 'Price action reflects current market conditions.',
      marketAnalysis: 'Market dynamics show standard cryptocurrency patterns.',
    };
  }
}

function extractRiskScore(text: string): number {
  const match = text.match(/Risk Score[:\s]*(\d+)/i);
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

function calculateFallbackRiskScore(tokenData: any): number {
  let score = 50; // Base score
  
  // Adjust based on market cap
  if (tokenData.marketCap > 10000000000) score -= 15; // Large cap
  else if (tokenData.marketCap > 1000000000) score -= 5; // Mid cap
  else score += 20; // Small cap
  
  // Adjust based on price change
  const priceChange = tokenData.priceChange24h || 0;
  if (Math.abs(priceChange) > 20) score += 15; // High volatility
  else if (Math.abs(priceChange) > 10) score += 5; // Medium volatility
  
  return Math.max(0, Math.min(100, score));
}

export async function POST(request: NextRequest) {
  try {
    const body: TokenAnalysisRequest = await request.json();
    
    if (!body.tokenName || !body.symbol) {
      return NextResponse.json(
        { error: 'Token name and symbol are required' },
        { status: 400 }
      );
    }

    // Fetch additional data if not provided
    let tokenData = { ...body };
    
    if (!body.price || !body.marketCap) {
      const externalData = await fetchTokenData(body.symbol);
      if (externalData) {
        tokenData = {
          ...tokenData,
          price: body.price || externalData.price,
          marketCap: body.marketCap || externalData.marketCap,
          volume24h: body.volume24h || externalData.volume24h,
          priceChange24h: body.priceChange24h || externalData.priceChange24h,
          description: body.description || externalData.description,
        };
      }
    }

    // Fetch DeFi data if applicable
    const defiData = await fetchDeFiData(body.symbol);
    if (defiData) {
      tokenData.tvl = body.tvl || defiData.tvl;
    }

    // Analyze with AI
    const analysis = await analyzeTokenWithAI(tokenData);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in token analysis:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 