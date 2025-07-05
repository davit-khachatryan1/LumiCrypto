'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, Code, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function DocsPage() {
  const sections = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using LumiCrypto',
      guides: [
        'Quick Start Guide',
        'Creating Your First Analysis',
        'Understanding AI Insights',
        'Portfolio Setup'
      ]
    },
    {
      icon: Code,
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      guides: [
        'Authentication',
        'Token Analysis Endpoints',
        'Portfolio Management',
        'Rate Limits & Errors'
      ]
    },
    {
      icon: Zap,
      title: 'Advanced Features',
      description: 'Power user features and customization',
      guides: [
        'Custom Alerts',
        'Advanced Filters',
        'Data Export',
        'Webhook Integration'
      ]
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Keep your data safe and secure',
      guides: [
        'API Security Best Practices',
        'Data Privacy',
        'Two-Factor Authentication',
        'Audit Logs'
      ]
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
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about using LumiCrypto effectively
          </p>
        </motion.div>

        {/* Quick Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search documentation..."
                className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
              />
              <Button>Search</Button>
            </div>
          </Card>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <section.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground mb-6">{section.description}</p>
                <ul className="space-y-2">
                  {section.guides.map((guide) => (
                    <li key={guide} className="flex items-center space-x-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span className="hover:text-primary cursor-pointer">{guide}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'How to Analyze Token Risk',
                description: 'Learn how our AI evaluates token risk factors',
                readTime: '5 min read'
              },
              {
                title: 'Portfolio Optimization Tips',
                description: 'Best practices for crypto portfolio management',
                readTime: '8 min read'
              },
              {
                title: 'Understanding DeFi Metrics',
                description: 'Key metrics for evaluating DeFi protocols',
                readTime: '6 min read'
              }
            ].map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="font-semibold mb-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                <span className="text-xs text-primary">{article.readTime}</span>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Card className="p-8">
            <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our community and support team are here to help.
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