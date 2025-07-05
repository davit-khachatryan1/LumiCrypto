'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrendingTokens } from '@/components/TrendingTokens';
import { 
  Brain, 
  Shield, 
  Zap, 
  BarChart3, 
  Wallet, 
  Globe, 
  ArrowRight,
  Sparkles,
  Star,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/explore');
  };

  const handleTokenSelect = (tokenId: string) => {
    router.push(`/token/${tokenId}`);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI Risk Scoring',
      description: 'Advanced machine learning algorithms analyze tokens and provide real-time risk assessments.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
    },
    {
      icon: Shield,
      title: 'Instant Analysis',
      description: 'Get comprehensive token analysis in seconds, not hours of manual research.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
    },
    {
      icon: Zap,
      title: 'Real-time Data',
      description: 'Live market data from multiple sources ensures you always have the latest information.',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
    },
    {
      icon: BarChart3,
      title: 'Smart Insights',
      description: 'Discover hidden patterns and trends with AI-powered market intelligence.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
    },
    {
      icon: Wallet,
      title: 'Wallet Analysis',
      description: 'Connect your wallet for personalized portfolio analysis and risk management.',
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/20',
    },
    {
      icon: Globe,
      title: 'Multi-Chain Support',
      description: 'Analyze tokens across Ethereum, BSC, Solana, Polygon, and more chains.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/20',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Tokens Analyzed' },
    { value: '1M+', label: 'AI Predictions' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Live Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-primary font-medium">Powered by AI</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                AI-powered{' '}
                <span className="gradient-text">crypto insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Analyze tokens, DeFi projects, and wallets instantly with AI risk scoring. 
                Make smarter investment decisions with real-time intelligence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="text-lg px-8 py-4 glow-effect"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/wallet')}
                className="text-lg px-8 py-4"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Trending Tokens */}
      <TrendingTokens onTokenSelect={handleTokenSelect} />

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">LumiCrypto</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of artificial intelligence to navigate the crypto market with confidence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card hover glow className="p-8 h-full">
                  <CardHeader className="pb-6">
                    <div className={`w-16 h-16 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/10 to-pink-500/10" />
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-primary mr-2" />
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Ready to Start Your <span className="gradient-text">Crypto Journey</span>?
                  </h2>
                </div>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of traders who trust LumiCrypto for smarter investment decisions
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    size="lg"
                    onClick={handleGetStarted}
                    className="text-lg px-8 py-4 glow-effect"
                  >
                    Get Started Free
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                    className="text-lg px-8 py-4"
                  >
                    View Demo
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 