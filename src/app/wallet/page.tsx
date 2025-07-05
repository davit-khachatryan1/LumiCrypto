'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useStore } from '@/lib/store';
import { WalletToken, AIAnalysis } from '@/lib/types';
import { generateWalletAIAnalysis } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { formatPrice, formatPercentage, getRiskColor, getRiskLabel } from '@/lib/utils';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  
  const [walletAnalysis, setWalletAnalysis] = useState<AIAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [walletTokens, setWalletTokens] = useState<WalletToken[]>([]);

  // Mock wallet data for demonstration - in production, fetch from blockchain
  const mockWalletTokens: WalletToken[] = [
    {
      address: '0x1234...5678',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: balance?.formatted || '0',
      decimals: 18,
      value_usd: parseFloat(balance?.formatted || '0') * 1700,
      price_usd: 1700.00,
      price_change_24h: 3.2,
      logo_url: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
    },
    {
      address: '0x2234...5678',
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: '0.15',
      decimals: 8,
      value_usd: 6450.00,
      price_usd: 43000.00,
      price_change_24h: -1.5,
      logo_url: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
    },
    {
      address: '0x3234...5678',
      symbol: 'SOL',
      name: 'Solana',
      balance: '25.0',
      decimals: 9,
      value_usd: 2250.00,
      price_usd: 90.00,
      price_change_24h: 8.7,
      logo_url: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
    }
  ];

  useEffect(() => {
    if (isConnected && address) {
      setWalletTokens(mockWalletTokens);
      toast.success('Wallet connected successfully!');
    } else {
      setWalletTokens([]);
      setWalletAnalysis(null);
    }
  }, [isConnected, address, balance]);

  const handleDisconnect = () => {
    disconnect();
    setWalletTokens([]);
    setWalletAnalysis(null);
    toast.success('Wallet disconnected');
  };

  const handleAnalyze = async () => {
    if (!isConnected || walletTokens.length === 0) return;
    
    try {
      setAnalyzing(true);
      toast.loading('Analyzing your portfolio...', { id: 'wallet-analysis' });
      
      const analysis = await generateWalletAIAnalysis(walletTokens);
      setWalletAnalysis(analysis);
      
      toast.success('Analysis complete!', { id: 'wallet-analysis' });
    } catch (error) {
      toast.error('Analysis failed', { id: 'wallet-analysis' });
      console.error('Wallet analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRefresh = () => {
    // In production, this would refetch wallet data from blockchain
    toast.success('Portfolio refreshed!');
  };

  const totalValue = walletTokens.reduce((sum, token) => sum + token.value_usd, 0);
  const totalChange24h = walletTokens.reduce((sum, token) => sum + (token.value_usd * token.price_change_24h / 100), 0);
  const totalChange24hPercent = totalValue > 0 ? (totalChange24h / totalValue) * 100 : 0;

  const pieData = walletTokens.map(token => ({
    name: token.symbol,
    value: token.value_usd,
    percentage: (token.value_usd / totalValue) * 100
  }));

  const colors = ['#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-12">
              <div className="mb-6">
                <Wallet className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground">
                  Connect your wallet to analyze your portfolio with AI-powered insights
                </p>
              </div>
              <ConnectButton />
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Portfolio Analysis</h1>
              <p className="text-muted-foreground">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleAnalyze} loading={analyzing}>
                <Brain className="w-4 h-4 mr-2" />
                Analyze with AI
              </Button>
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{formatPrice(totalValue)}</p>
                    <p className="text-muted-foreground">Total Value</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-3xl font-bold ${totalChange24hPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatPercentage(totalChange24hPercent)}
                    </p>
                    <p className="text-muted-foreground">24h Change</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">{walletTokens.length}</p>
                    <p className="text-muted-foreground">Assets</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {walletTokens.map((token) => (
                    <div key={token.address} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={token.logo_url}
                          alt={token.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{token.name}</p>
                          <p className="text-sm text-muted-foreground">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(token.value_usd)}</p>
                        <div className={`flex items-center space-x-1 ${token.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {token.price_change_24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span className="text-sm">{formatPercentage(token.price_change_24h)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatPrice(value as number)} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Analysis */}
        {walletAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI Portfolio Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium">Risk Score</span>
                    <span className={`text-2xl font-bold ${getRiskColor(walletAnalysis.risk_score)}`}>
                      {walletAnalysis.risk_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${walletAnalysis.risk_score}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getRiskLabel(walletAnalysis.risk_score)}
                  </p>
                </div>

                <p className="text-muted-foreground mb-6">{walletAnalysis.summary}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      Portfolio Strengths
                    </h4>
                    <ul className="space-y-2">
                      {walletAnalysis.strengths.map((strength, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-400" />
                      Risk Factors
                    </h4>
                    <ul className="space-y-2">
                      {walletAnalysis.risk_factors.map((factor, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {walletAnalysis.red_flags && walletAnalysis.red_flags.length > 0 && (
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center text-red-400">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Red Flags
                    </h4>
                    <ul className="space-y-1">
                      {walletAnalysis.red_flags.map((flag, i) => (
                        <li key={i} className="text-sm text-red-300">• {flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {!walletAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-12 text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Portfolio Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Get AI-powered insights about your portfolio's risk profile and optimization suggestions.
              </p>
              <Button onClick={handleAnalyze} loading={analyzing}>
                <Brain className="w-4 h-4 mr-2" />
                Analyze Portfolio
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
} 