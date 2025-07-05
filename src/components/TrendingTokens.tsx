'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingToken } from '@/lib/types';
import { fetchTrendingTokens } from '@/lib/api';
import { Card } from './ui/Card';
import { Loading } from './ui/Loading';
import { TrendingUp, Star } from 'lucide-react';

interface TrendingTokensProps {
  onTokenSelect?: (tokenId: string) => void;
}

export function TrendingTokens({ onTokenSelect }: TrendingTokensProps) {
  const [tokens, setTokens] = useState<TrendingToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingTokens = async () => {
      try {
        setLoading(true);
        const trendingTokens = await fetchTrendingTokens();
        setTokens(trendingTokens);
      } catch (error) {
        console.error('Error loading trending tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingTokens();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <Loading message="Loading trending tokens..." />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold gradient-text">Trending Tokens</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Discover the hottest cryptocurrencies gaining momentum right now
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tokens.map((trending, index) => (
            <motion.div
              key={trending.item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => onTokenSelect?.(trending.item.id)}
            >
              <Card hover glow className="p-6 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-1 bg-primary/20 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-primary fill-current" />
                    <span className="text-xs text-primary font-medium">#{index + 1}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-3 pt-6">
                  <div className="relative">
                    <img
                      src={trending.item.large}
                      alt={trending.item.name}
                      className="w-16 h-16 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/64/7c3aed/ffffff?text=${trending.item.symbol.charAt(0).toUpperCase()}`;
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                  </div>

                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-1">{trending.item.name}</h3>
                    <p className="text-muted-foreground text-sm uppercase">{trending.item.symbol}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Market Cap Rank</p>
                    <p className="text-lg font-bold text-primary">#{trending.item.market_cap_rank}</p>
                  </div>

                  <div className="w-full pt-2">
                    <div className="h-1 bg-gradient-to-r from-primary/20 to-primary rounded-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(trending.item.score * 10, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      Trending Score: {trending.item.score}/10
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 