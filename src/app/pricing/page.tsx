'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with crypto analysis',
      features: [
        'Basic token analysis',
        'Limited AI insights',
        'Portfolio tracking up to 5 tokens',
        'Community access',
        'Email support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      icon: Crown,
      price: '$29',
      period: 'month',
      description: 'Advanced features for serious crypto investors',
      features: [
        'Unlimited token analysis',
        'Advanced AI insights',
        'Portfolio tracking unlimited tokens',
        'Priority support',
        'Custom alerts',
        'API access',
        'Export data'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: '$99',
      period: 'month',
      description: 'For institutions and professional traders',
      features: [
        'Everything in Pro',
        'White-label solutions',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom AI models',
        'Multi-team access'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlock the power of AI-driven crypto analysis with plans designed for every investor
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <Card className={`p-8 h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <div className="text-center mb-6">
                  <plan.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and crypto payments including Bitcoin and Ethereum."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial for our Pro plan with no credit card required."
              },
              {
                question: "Do you offer discounts for annual plans?",
                answer: "Yes, annual plans come with a 20% discount. Contact our sales team for more details."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 