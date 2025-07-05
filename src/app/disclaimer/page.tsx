'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { AlertTriangle, TrendingDown, Shield, Info, DollarSign, Users } from 'lucide-react';

export default function DisclaimerPage() {
  const lastUpdated = '2024-01-15';

  const disclaimers = [
    {
      icon: DollarSign,
      title: 'Investment Risk',
      content: 'Cryptocurrency investments are highly volatile and risky. You may lose all or part of your investment. Past performance does not guarantee future results.'
    },
    {
      icon: Info,
      title: 'Not Financial Advice',
      content: 'Our analysis and insights are for informational purposes only and do not constitute financial, investment, or trading advice. Always consult with qualified professionals.'
    },
    {
      icon: TrendingDown,
      title: 'Market Volatility',
      content: 'Cryptocurrency markets are extremely volatile and can fluctuate rapidly. Prices can change dramatically within short periods due to various factors.'
    },
    {
      icon: Shield,
      title: 'AI Limitations',
      content: 'Our AI analysis is based on historical data and algorithms. It cannot predict future market movements with certainty and should not be solely relied upon.'
    },
    {
      icon: Users,
      title: 'User Responsibility',
      content: 'You are solely responsible for your investment decisions. Conduct thorough research and consider your risk tolerance before making any investments.'
    },
    {
      icon: AlertTriangle,
      title: 'Regulatory Risk',
      content: 'Cryptocurrency regulations vary by jurisdiction and are subject to change. Regulatory changes may significantly impact cryptocurrency values and availability.'
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
            Important Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read and understand these important disclaimers before using LumiCrypto
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-200">
            <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
              <div>
                <h2 className="text-2xl font-bold text-red-700">High Risk Investment Warning</h2>
                <p className="text-muted-foreground">Cryptocurrency trading involves significant financial risk</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Cryptocurrencies are highly volatile and speculative investments. The value of cryptocurrencies can 
              go down as well as up, and you may get back less than you invested. You should carefully consider 
              whether trading or holding cryptocurrencies is suitable for you in light of your financial circumstances.
            </p>
          </Card>
        </motion.div>

        {/* Disclaimer Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Key Disclaimers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disclaimers.map((disclaimer, index) => (
              <Card key={disclaimer.title} className="p-6">
                <disclaimer.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3">{disclaimer.title}</h3>
                <p className="text-muted-foreground text-sm">{disclaimer.content}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Detailed Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="space-y-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">Service Availability</h3>
              <p className="text-muted-foreground">
                LumiCrypto services are provided on an "as-is" and "as-available" basis. We do not guarantee 
                uninterrupted or error-free service. Technical issues, maintenance, or other factors may cause 
                temporary service interruptions.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">Data Accuracy</h3>
              <p className="text-muted-foreground">
                While we strive to provide accurate and up-to-date information, we cannot guarantee the 
                completeness, accuracy, or timeliness of data. Market data is sourced from third parties 
                and may contain errors or delays.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">Limitation of Liability</h3>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, LumiCrypto shall not be liable for any direct, 
                indirect, incidental, consequential, or punitive damages arising from your use of our services, 
                including but not limited to financial losses from investment decisions.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-4">Third-Party Links</h3>
              <p className="text-muted-foreground">
                Our platform may contain links to third-party websites or services. We are not responsible 
                for the content, privacy policies, or practices of these external sites. Use of third-party 
                services is at your own risk.
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Acknowledgment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Acknowledgment</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              By using LumiCrypto, you acknowledge that you have read, understood, and agree to these disclaimers. 
              You understand the risks involved in cryptocurrency investments and use our services at your own risk.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                I Understand the Risks
              </button>
              <button className="px-6 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                Contact Legal Team
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 