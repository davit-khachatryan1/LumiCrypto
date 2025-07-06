'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useBillingStore, BILLING_PLANS } from '@/lib/store';
import { useState } from 'react';

export default function PricingPage() {
  const { currentPlan, setCurrentPlan } = useBillingStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const planIcons = {
    basic: Zap,
    pro: Crown,
    enterprise: Rocket
  };
  
  const planDescriptions = {
    basic: 'Perfect for getting started with crypto analysis',
    pro: 'Advanced features for serious crypto investors',
    enterprise: 'For institutions and professional traders'
  };
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentPlan(planId);
    // In a real app, this would trigger payment processing
    setTimeout(() => {
      setSelectedPlan(null);
      // Show success message
    }, 1000);
  };

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

        {/* Current Plan Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">Current Plan:</span>
            <span className="text-sm font-bold text-primary">{currentPlan.name}</span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {BILLING_PLANS.map((plan, index) => {
            const Icon = planIcons[plan.id as keyof typeof planIcons];
            const isCurrentPlan = currentPlan.id === plan.id;
            const isPopular = plan.id === 'pro';
            const isSelecting = selectedPlan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current
                  </div>
                )}
                <Card className={`p-8 h-full ${isCurrentPlan ? 'border-green-500 shadow-lg' : isPopular ? 'border-primary shadow-lg' : ''}`}>
                  <div className="text-center mb-6">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.interval}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {planDescriptions[plan.id as keyof typeof planDescriptions]}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Button 
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full ${isCurrentPlan ? 'bg-green-500 hover:bg-green-600' : isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={isCurrentPlan ? 'primary' : isPopular ? 'primary' : 'outline'}
                      disabled={isCurrentPlan || isSelecting}
                      loading={isSelecting}
                    >
                      {isCurrentPlan ? 'Current Plan' : isSelecting ? 'Selecting...' : plan.price === 0 ? 'Select Plan' : 'Upgrade'}
                    </Button>
                    
                    {plan.limits.tokensPerMonth !== -1 && (
                      <div className="text-xs text-muted-foreground text-center">
                        {plan.limits.tokensPerMonth} tokens/month • {plan.limits.alertsLimit} alerts • {plan.limits.teamsLimit} teams
                      </div>
                    )}
                    
                    {plan.limits.tokensPerMonth === -1 && (
                      <div className="text-xs text-muted-foreground text-center">
                        Unlimited everything
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
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