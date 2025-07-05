'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatPercentage, formatMarketCap } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Brain,
  Wallet,
  Eye,
  Target,
  Zap,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [timeRange, setTimeRange] = useState('7d');

  // Mock performance data
  const performanceData = [
    { date: '2024-01-01', value: 10000, change: 0 },
    { date: '2024-01-02', value: 10250, change: 2.5 },
    { date: '2024-01-03', value: 9800, change: -4.4 },
    { date: '2024-01-04', value: 10100, change: 3.1 },
    { date: '2024-01-05', value: 10450, change: 3.5 },
    { date: '2024-01-06', value: 10200, change: -2.4 },
    { date: '2024-01-07', value: 10600, change: 3.9 },
  ];

  const marketStats = [
    { name: 'Total Market Cap', value: '$2.1T', change: '+2.3%', positive: true },
    { name: '24h Volume', value: '$89.2B', change: '-1.2%', positive: false },
    { name: 'Active Tokens', value: '10,248', change: '+0.8%', positive: true },
    { name: 'DeFi TVL', value: '$84.5B', change: '+4.2%', positive: true },
  ];

  const recentActivities = [
    { type: 'analysis', token: 'BTC', action: 'Analyzed Bitcoin', time: '2 hours ago' },
    { type: 'favorite', token: 'ETH', action: 'Added Ethereum to favorites', time: '4 hours ago' },
    { type: 'analysis', token: 'SOL', action: 'Analyzed Solana', time: '6 hours ago' },
    { type: 'wallet', token: 'USDC', action: 'Connected wallet', time: '8 hours ago' },
  ];

  // Mock portfolio data based on wallet connection
  const totalPortfolioValue = isConnected && balance ? parseFloat(balance.formatted) * 1700 : 0;
  const portfolioChange = isConnected ? 3.2 : 0;

  const insights = [
    {
      title: 'Portfolio Performance',
      description: 'Your portfolio has gained 12.3% this month',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Risk Assessment',
      description: 'Medium risk level detected in your holdings',
      icon: Target,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      title: 'New Opportunities',
      description: '3 tokens match your investment criteria',
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Your personalized crypto insights and portfolio overview
          </p>
        </motion.div>

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Card className="max-w-md mx-auto p-8">
              <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to see your personalized dashboard with portfolio insights
              </p>
              <ConnectButton />
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Portfolio Value</h3>
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{formatPrice(totalPortfolioValue)}</p>
                    <div className={`flex items-center space-x-1 ${portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {portfolioChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span className="text-sm font-medium">{formatPercentage(portfolioChange)}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {marketStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground">{stat.name}</h3>
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Portfolio Performance */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 mb-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>Portfolio Performance</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {formatPrice(totalPortfolioValue)}
                          </p>
                          <div className={`flex items-center space-x-1 ${portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {portfolioChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span className="font-medium">{formatPercentage(portfolioChange)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <XAxis dataKey="date" hide />
                          <YAxis hide />
                          <Tooltip 
                            formatter={(value) => [formatPrice(value as number), 'Value']}
                            labelFormatter={(label) => `Date: ${label}`}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#7c3aed" 
                            fill="#7c3aed" 
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insights.map((insight, index) => (
                        <div key={insight.title} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                            <insight.icon className={`w-4 h-4 ${insight.color}`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{insight.title}</h4>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            activity.type === 'analysis' ? 'bg-blue-500/10' :
                            activity.type === 'favorite' ? 'bg-yellow-500/10' :
                            'bg-green-500/10'
                          }`}>
                            {activity.type === 'analysis' && <Brain className="w-4 h-4 text-blue-400" />}
                            {activity.type === 'favorite' && <Eye className="w-4 h-4 text-yellow-400" />}
                            {activity.type === 'wallet' && <Wallet className="w-4 h-4 text-green-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 