'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Shield, Eye, Lock, Users, Globe, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = '2024-01-15';

  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Account information (email, username, profile details)',
        'Usage data (pages visited, features used, time spent)',
        'Device information (browser type, IP address, operating system)',
        'Cookie and tracking data for analytics and personalization',
        'Financial data (only public wallet addresses, no private keys)'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our services',
        'Personalize your experience and recommendations',
        'Communicate updates and important information',
        'Analyze usage patterns to enhance platform performance',
        'Ensure security and prevent fraud'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell personal information to third parties',
        'Data may be shared with service providers under strict agreements',
        'Legal compliance may require disclosure to authorities',
        'Anonymous, aggregated data may be used for research',
        'User consent is obtained for any additional sharing'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data transmission',
        'Secure storage with regular security audits',
        'Multi-factor authentication for account protection',
        'Regular security updates and monitoring',
        'Incident response procedures for data breaches'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access your personal data and request corrections',
        'Delete your account and associated data',
        'Opt-out of marketing communications',
        'Control cookie preferences',
        'Request data portability'
      ]
    },
    {
      title: 'International Transfers',
      content: [
        'Data may be processed in countries outside your residence',
        'Adequate protection measures are implemented',
        'Compliance with applicable data protection laws',
        'Standard contractual clauses for international transfers',
        'User consent for cross-border data processing'
      ]
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your data is protected with enterprise-grade security measures and encryption.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We are clear about what data we collect and how we use it.'
    },
    {
      icon: Lock,
      title: 'Data Minimization',
      description: 'We only collect data necessary to provide our services.'
    },
    {
      icon: Users,
      title: 'User Control',
      description: 'You have full control over your data and privacy settings.'
    }
  ];

  const contact = {
    email: 'privacy@lumicrypto.com',
    address: '123 Privacy Street, San Francisco, CA 94105',
    phone: '+1 (555) 123-4567'
  };

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
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Privacy Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Privacy Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <Card key={principle.title} className="p-6">
                <principle.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Policy Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.title} className="p-8">
                <h3 className="text-2xl font-bold mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Cookie Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Cookie Policy</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar technologies to enhance your experience on our platform. 
                Cookies help us remember your preferences, analyze site traffic, and provide personalized content.
              </p>
              <p>
                You can control cookie preferences through your browser settings. However, disabling 
                certain cookies may limit functionality of our services.
              </p>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Types of Cookies We Use:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Essential Cookies:</strong> Required for basic site functionality</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Analytics Cookies:</strong> Help us understand site usage</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Functional Cookies:</strong> Remember your preferences</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Marketing Cookies:</strong> Deliver relevant advertisements</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Third-Party Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Third-Party Services</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We integrate with trusted third-party services to enhance our platform. These services 
                have their own privacy policies and data practices:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>CoinGecko:</strong> Cryptocurrency market data</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Google Analytics:</strong> Usage analytics and insights</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Stripe:</strong> Payment processing for subscriptions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>SendGrid:</strong> Email delivery services</span>
                </li>
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about this privacy policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </div>
              <div>{contact.address}</div>
              <div>{contact.phone}</div>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
              <button className="px-6 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                Manage Preferences
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 