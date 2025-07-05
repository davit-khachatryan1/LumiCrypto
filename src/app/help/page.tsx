'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, BookOpen, MessageCircle, Video, FileText, Users, Zap, Shield } from 'lucide-react';

export default function HelpPage() {
  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of LumiCrypto',
      articles: 12
    },
    {
      icon: Zap,
      title: 'AI Analysis',
      description: 'Understanding our AI insights',
      articles: 8
    },
    {
      icon: Users,
      title: 'Portfolio Management',
      description: 'Track and analyze your portfolio',
      articles: 6
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Keep your data safe',
      articles: 4
    },
    {
      icon: MessageCircle,
      title: 'API Documentation',
      description: 'Integrate with our API',
      articles: 10
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch and learn',
      articles: 5
    }
  ];

  const popularArticles = [
    {
      title: 'How to Create Your First Analysis',
      category: 'Getting Started',
      readTime: '3 min read',
      views: '2.5K views'
    },
    {
      title: 'Understanding AI Risk Scores',
      category: 'AI Analysis',
      readTime: '5 min read',
      views: '1.8K views'
    },
    {
      title: 'Setting Up Portfolio Tracking',
      category: 'Portfolio Management',
      readTime: '4 min read',
      views: '1.6K views'
    },
    {
      title: 'API Authentication Guide',
      category: 'API Documentation',
      readTime: '6 min read',
      views: '1.2K views'
    },
    {
      title: 'Security Best Practices',
      category: 'Security & Privacy',
      readTime: '7 min read',
      views: '1.1K views'
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Contact Support',
      description: 'Get help from our team',
      action: 'Start Chat'
    },
    {
      icon: Video,
      title: 'Watch Tutorials',
      description: 'Learn through video guides',
      action: 'Watch Now'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Technical reference guides',
      action: 'Read Docs'
    }
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
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to your questions and learn how to use LumiCrypto effectively
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help articles, tutorials, or FAQs..."
                className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
              />
              <Button>Search</Button>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <Card key={action.title} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <action.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{action.description}</p>
              <Button variant="outline" size="sm">{action.action}</Button>
            </Card>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <category.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{category.articles} articles</span>
                  <Button variant="outline" size="sm">Browse</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How accurate are the AI predictions?",
                answer: "Our AI models are trained on extensive historical data and achieve high accuracy rates. However, all predictions should be considered as one factor in your investment decisions."
              },
              {
                question: "Can I export my analysis data?",
                answer: "Yes, Pro and Enterprise users can export their analysis data in various formats including CSV, JSON, and PDF reports."
              },
              {
                question: "How often is the data updated?",
                answer: "Market data is updated in real-time, while AI analysis is refreshed every 15 minutes to ensure you have the most current insights."
              },
              {
                question: "Is there a mobile app?",
                answer: "Currently, LumiCrypto is available as a responsive web application. A dedicated mobile app is planned for future release."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept major credit cards, PayPal, and crypto payments including Bitcoin and Ethereum."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Contact Support</Button>
              <Button variant="outline">Join Community</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 