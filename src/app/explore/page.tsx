'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Token } from '@/lib/types';
import { fetchTokens, searchTokens, generateAIAnalysis } from '@/lib/api';
import { useStore } from '@/lib/store';
import { TokenCard } from '@/components/TokenCard';
import { TokenCardSkeleton } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { debounce } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Sparkles,
  TrendingUp,
  DollarSign,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchInput, setSearchInput] = useState('');
  
  const {
    filters,
    setFilters,
    setSelectedToken,
    setAiAnalysis,
    setIsAnalyzing,
    isAnalyzing,
  } = useStore();

  // Initialize search from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchInput(searchQuery);
      handleSearch(searchQuery);
    } else {
      loadTokens(1, true);
    }
  }, [searchParams]);

  const loadTokens = async (pageNum: number, reset = false) => {
    try {
      setLoading(true);
      const newTokens = await fetchTokens(pageNum, 50, filters.category);
      
      if (reset) {
        setTokens(newTokens);
      } else {
        setTokens(prev => [...prev, ...newTokens]);
      }
      
      setHasMore(newTokens.length === 50);
    } catch (error) {
      toast.error('Failed to load tokens');
      console.error('Error loading tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadTokens(1, true);
      return;
    }

    try {
      setLoading(true);
      const results = await searchTokens(query);
      
      if (results.length === 0) {
        toast.error('No tokens found for your search');
        return;
      }

      // Convert search results to tokens (simplified)
      const searchTokens = results.map(result => ({
        id: result.id,
        symbol: result.symbol,
        name: result.name,
        image: result.thumb,
        current_price: Math.random() * 1000,
        market_cap: Math.random() * 1000000000,
        market_cap_rank: result.market_cap_rank,
        price_change_percentage_24h: (Math.random() - 0.5) * 20,
        price_change_percentage_7d: (Math.random() - 0.5) * 50,
        sparkline_in_7d: { price: [] },
        total_volume: Math.random() * 50000000,
        high_24h: Math.random() * 1100,
        low_24h: Math.random() * 900,
        circulating_supply: Math.random() * 1000000,
        total_supply: Math.random() * 1000000,
        max_supply: Math.random() * 1000000,
        ath: Math.random() * 1200,
        ath_change_percentage: (Math.random() - 0.5) * 100,
        ath_date: new Date().toISOString(),
        atl: Math.random() * 100,
        atl_change_percentage: Math.random() * 1000,
        atl_date: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      }));

      setTokens(searchTokens);
      setHasMore(false);
    } catch (error) {
      toast.error('Search failed');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [handleSearch]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    router.push(`/token/${token.id}`);
  };

  const handleTokenAnalyze = async (token: Token) => {
    try {
      setIsAnalyzing(true);
      toast.loading('Analyzing token with AI...', { id: 'analysis' });
      
      const analysis = await generateAIAnalysis(token.id, token);
      setAiAnalysis(analysis);
      
      toast.success('Analysis complete!', { id: 'analysis' });
      router.push(`/token/${token.id}?tab=analysis`);
    } catch (error) {
      toast.error('Analysis failed', { id: 'analysis' });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value });
    setPage(1);
    loadTokens(1, true);
  };

  const handleSortChange = () => {
    const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({ sortOrder: newOrder });
    setPage(1);
    loadTokens(1, true);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadTokens(nextPage, false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'decentralized-finance-defi', label: 'DeFi' },
    { value: 'smart-contract-platform', label: 'Smart Contracts' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'nft', label: 'NFT' },
    { value: 'layer-1', label: 'Layer 1' },
    { value: 'layer-2', label: 'Layer 2' },
  ];

  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'price', label: 'Price' },
    { value: 'volume', label: 'Volume' },
    { value: 'change', label: '24h Change' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Explore Tokens</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover and analyze cryptocurrencies with AI-powered insights
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search tokens by name, symbol, or address..."
                  value={searchInput}
                  onChange={handleSearchInput}
                  icon={<Search className="w-4 h-4" />}
                  className="w-full"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {/* Category Filter */}
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="px-4 py-2 rounded-md border border-input bg-background text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                {/* Sort By */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-2 rounded-md border border-input bg-background text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                {/* Sort Order */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSortChange}
                  className="px-3"
                >
                  {filters.sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </Button>

                {/* View Mode */}
                <div className="flex border border-input rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
              <p className="text-lg font-bold">$2.1T</p>
            </Card>
            <Card className="p-4 text-center">
              <BarChart3 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-lg font-bold">$89.2B</p>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Markets</p>
              <p className="text-lg font-bold">10,248</p>
            </Card>
            <Card className="p-4 text-center">
              <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-lg font-bold">1.2M</p>
            </Card>
          </div>
        </motion.div>

        {/* Token Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {loading && tokens.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <TokenCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {tokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TokenCard
                      token={token}
                      onSelect={handleTokenSelect}
                      onAnalyze={handleTokenAnalyze}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    onClick={loadMore}
                    loading={loading}
                    size="lg"
                    className="px-8"
                  >
                    Load More Tokens
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
} 