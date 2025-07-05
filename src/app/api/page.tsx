'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Code, Key, Zap, Shield, BookOpen, Github } from 'lucide-react';

export default function ApiPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/tokens',
      description: 'Get list of all supported tokens',
      example: `curl -X GET "https://api.lumicrypto.com/v1/tokens" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: 'GET',
      path: '/api/tokens/:id',
      description: 'Get detailed information about a specific token',
      example: `curl -X GET "https://api.lumicrypto.com/v1/tokens/bitcoin" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      method: 'POST',
      path: '/api/analysis',
      description: 'Get AI-powered analysis for a token or portfolio',
      example: `curl -X POST "https://api.lumicrypto.com/v1/analysis" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"token": "bitcoin", "analysis_type": "risk"}'`
    },
    {
      method: 'GET',
      path: '/api/portfolio',
      description: 'Get portfolio analysis and insights',
      example: `curl -X GET "https://api.lumicrypto.com/v1/portfolio" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
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
            LumiCrypto API
          </h1>
          <p className="text-xl text-muted-foreground">
            Integrate AI-powered crypto analysis into your applications
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Zap,
              title: 'Real-time Data',
              description: 'Access live crypto market data and AI analysis'
            },
            {
              icon: Shield,
              title: 'Secure & Reliable',
              description: '99.9% uptime with enterprise-grade security'
            },
            {
              icon: Code,
              title: 'RESTful API',
              description: 'Simple HTTP requests with JSON responses'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    endpoint.method === 'GET' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono">{endpoint.path}</code>
                </div>
                <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Example:</h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{endpoint.example}</code>
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sign up for a free API key and start building with LumiCrypto's powerful AI analysis tools
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Get API Key</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>View Documentation</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 