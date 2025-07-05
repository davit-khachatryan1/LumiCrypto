'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Scale, Users, Shield, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = '2024-01-15';

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing LumiCrypto, you agree to be bound by these terms. If you disagree with any part, you may not use our service.'
    },
    {
      title: 'Service Description',
      content: 'LumiCrypto provides AI-powered cryptocurrency analysis tools. We offer market insights, portfolio tracking, and investment analysis.'
    },
    {
      title: 'User Responsibilities',
      content: 'Users must provide accurate information, maintain account security, and comply with applicable laws. You are responsible for your investment decisions.'
    },
    {
      title: 'Prohibited Activities',
      content: 'Users may not: violate laws, interfere with service operations, attempt unauthorized access, or use the service for illegal activities.'
    },
    {
      title: 'Intellectual Property',
      content: 'All content, features, and functionality are owned by LumiCrypto and protected by intellectual property laws.'
    },
    {
      title: 'Disclaimers',
      content: 'Our service is provided "as-is" without warranties. Cryptocurrency investments are risky. We are not financial advisors.'
    },
    {
      title: 'Limitation of Liability',
      content: 'LumiCrypto shall not be liable for any indirect, incidental, or consequential damages arising from service use.'
    },
    {
      title: 'Termination',
      content: 'We may terminate accounts for terms violations. Users may close accounts at any time. Termination does not affect accrued rights.'
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
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using LumiCrypto
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Legal Agreement</h3>
              <p className="text-sm text-muted-foreground">These terms create a binding legal agreement</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">User Rights</h3>
              <p className="text-sm text-muted-foreground">Your rights and responsibilities as a user</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Service Protection</h3>
              <p className="text-sm text-muted-foreground">How we protect our service and users</p>
            </Card>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={section.title} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <p className="text-muted-foreground">{section.content}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-200">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cryptocurrency investments carry significant risk. Our analysis tools are for informational purposes only and do not constitute financial advice. 
              Always conduct your own research and consult with financial professionals before making investment decisions.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                I Understand
              </button>
              <button className="px-6 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                Contact Legal
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 