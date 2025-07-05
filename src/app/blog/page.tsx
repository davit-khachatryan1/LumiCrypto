'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, User, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

export default function BlogPage() {
  const featuredPost = {
    title: 'The Future of AI in Crypto Analysis: What 2024 Holds',
    excerpt: 'Exploring the latest developments in artificial intelligence and how they\'re revolutionizing cryptocurrency analysis and investment strategies.',
    author: 'Alex Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'AI & Technology',
    image: '/api/placeholder/800/400'
  };

  const posts = [
    {
      title: 'Understanding DeFi Risk Factors',
      excerpt: 'A comprehensive guide to evaluating risks in decentralized finance protocols.',
      author: 'Sarah Rodriguez',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'DeFi',
      icon: Shield
    },
    {
      title: 'Portfolio Diversification in Crypto',
      excerpt: 'Best practices for building a balanced cryptocurrency portfolio.',
      author: 'Marcus Thompson',
      date: '2024-01-10',
      readTime: '5 min read',
      category: 'Investment',
      icon: TrendingUp
    },
    {
      title: 'Speed vs Security: Layer 2 Solutions',
      excerpt: 'Comparing different Layer 2 scaling solutions and their trade-offs.',
      author: 'Emma Park',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Technology',
      icon: Zap
    },
    {
      title: 'NFT Market Analysis: 2024 Trends',
      excerpt: 'What the data tells us about the evolving NFT marketplace.',
      author: 'Alex Chen',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'NFTs',
      icon: TrendingUp
    },
    {
      title: 'Regulatory Landscape Update',
      excerpt: 'Recent regulatory developments and their impact on crypto markets.',
      author: 'Sarah Rodriguez',
      date: '2024-01-03',
      readTime: '6 min read',
      category: 'Regulation',
      icon: Shield
    },
    {
      title: 'Smart Contract Security Best Practices',
      excerpt: 'Essential security measures for smart contract development.',
      author: 'Marcus Thompson',
      date: '2024-01-01',
      readTime: '9 min read',
      category: 'Security',
      icon: Shield
    }
  ];

  const categories = [
    'All Posts',
    'AI & Technology',
    'DeFi',
    'Investment',
    'Security',
    'Regulation',
    'NFTs'
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            LumiCrypto Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights, analysis, and updates from the world of cryptocurrency and AI
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-r from-primary/20 to-violet-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                    <span className="text-muted-foreground">Featured Article</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-muted-foreground">Featured</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="flex items-center space-x-2">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {posts.map((post, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-4">
                <post.icon className="w-5 h-5 text-primary" />
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest crypto insights, AI developments, and platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 