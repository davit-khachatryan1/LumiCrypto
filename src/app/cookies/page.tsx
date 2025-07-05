'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Cookie, Settings, BarChart, Users, Shield } from 'lucide-react';

export default function CookiesPage() {
  const lastUpdated = '2024-01-15';

  const cookieTypes = [
    {
      icon: Shield,
      name: 'Essential Cookies',
      description: 'Required for basic website functionality',
      purpose: 'Authentication, security, basic site operations',
      retention: 'Session or up to 1 year',
      required: true
    },
    {
      icon: BarChart,
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our site',
      purpose: 'Usage statistics, performance monitoring',
      retention: 'Up to 2 years',
      required: false
    },
    {
      icon: Users,
      name: 'Functional Cookies',
      description: 'Remember your preferences and settings',
      purpose: 'User preferences, personalization',
      retention: 'Up to 1 year',
      required: false
    },
    {
      icon: Settings,
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements',
      purpose: 'Targeted advertising, campaign tracking',
      retention: 'Up to 1 year',
      required: false
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
            Cookie Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn about how we use cookies to improve your experience
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {lastUpdated}
          </p>
        </motion.div>

        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <Cookie className="w-12 h-12 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">What are Cookies?</h2>
                <p className="text-muted-foreground">Small data files stored on your device</p>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                They allow us to recognize your device and store some information about your preferences or past actions.
              </p>
              <p>
                We use cookies to provide you with a better browsing experience, analyze site traffic, 
                personalize content, and serve targeted advertisements.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Cookie Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => (
              <Card key={cookie.name} className="p-6">
                <div className="flex items-start space-x-4">
                  <cookie.icon className="w-8 h-8 text-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{cookie.name}</h3>
                      {cookie.required ? (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          Required
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{cookie.description}</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div><strong>Purpose:</strong> {cookie.purpose}</div>
                      <div><strong>Retention:</strong> {cookie.retention}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Cookie Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Managing Your Cookie Preferences</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                You have several options to control and manage cookies:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Cookie Banner:</strong> Use our cookie consent banner to manage preferences</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Account Settings:</strong> Manage functional cookies in your account settings</span>
                </li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <Button>Manage Cookie Preferences</Button>
              <Button variant="outline">Browser Settings Guide</Button>
            </div>
          </Card>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Third-Party Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We also use third-party services that may set their own cookies:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Google Analytics</h4>
                  <p className="text-sm">Tracks website usage and performance</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Stripe</h4>
                  <p className="text-sm">Processes payments securely</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Intercom</h4>
                  <p className="text-sm">Provides customer support chat</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">HubSpot</h4>
                  <p className="text-sm">Marketing automation and analytics</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <Settings className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about our use of cookies or this policy, please contact us.
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Contact Support</Button>
              <Button variant="outline">View Privacy Policy</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 