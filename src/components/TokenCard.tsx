'use client';

import { motion } from 'framer-motion';
import { Token } from '@/lib/types';
import { formatPrice, formatPercentage, formatMarketCap } from '@/lib/utils';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Heart, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TokenCardProps {
  token: Token;
  onAnalyze?: (token: Token) => void;
  onSelect?: (token: Token) => void;
}

export function TokenCard({ token, onAnalyze, onSelect }: TokenCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useStore();
  const isTokenFavorite = isFavorite(token.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTokenFavorite) {
      removeFromFavorites(token.id);
    } else {
      addToFavorites(token.id);
    }
  };

  const handleAnalyze = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAnalyze?.(token);
  };

  const handleSelect = () => {
    onSelect?.(token);
  };

  const sparklineData = token.sparkline_in_7d?.price?.map((price, index) => ({
    value: price,
    index,
  })) || [];

  const isPositive = token.price_change_percentage_24h > 0;

  return (
    <Card hover glow className="p-6 group" onClick={handleSelect}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={token.image}
              alt={token.name}
              className="w-12 h-12 rounded-full"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/48/7c3aed/ffffff?text=${token.symbol.charAt(0).toUpperCase()}`;
              }}
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{token.name}</h3>
            <p className="text-muted-foreground text-sm uppercase">{token.symbol}</p>
          </div>
        </div>
        <motion.button
          onClick={handleFavoriteToggle}
          className={`p-2 rounded-full transition-colors ${
            isTokenFavorite ? 'text-red-500 bg-red-500/20' : 'text-muted-foreground hover:text-red-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-5 h-5 ${isTokenFavorite ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold">{formatPrice(token.current_price)}</p>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{formatPercentage(token.price_change_percentage_24h)}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="font-semibold">{formatMarketCap(token.market_cap)}</p>
          <p className="text-xs text-muted-foreground">#{token.market_cap_rank}</p>
        </div>
      </div>

      {sparklineData.length > 0 && (
        <div className="mb-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                dot={false}
                strokeOpacity={0.8}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <BarChart3 className="w-4 h-4" />
          <span>{formatMarketCap(token.total_volume)} Vol</span>
        </div>
        <Button
          onClick={handleAnalyze}
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Analyze with AI
        </Button>
      </div>
    </Card>
  );
} 