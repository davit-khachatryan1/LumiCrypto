'use client';

import { motion } from 'framer-motion';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useBillingStore, BILLING_PLANS } from '@/lib/store';

interface UpgradePromptProps {
  feature: string;
  title: string;
  description: string;
  requiredPlan?: string;
  onUpgrade?: () => void;
}

export function UpgradePrompt({ 
  feature, 
  title, 
  description, 
  requiredPlan,
  onUpgrade 
}: UpgradePromptProps) {
  const { setCurrentPlan } = useBillingStore();
  
  const handleUpgrade = (planId: string) => {
    setCurrentPlan(planId);
    if (onUpgrade) {
      onUpgrade();
    }
  };

  const suggestedPlan = BILLING_PLANS.find(p => p.id === requiredPlan) || BILLING_PLANS[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px] p-6"
    >
      <Card className="max-w-md w-full text-center p-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5 text-primary mr-2" />
            <span className="font-semibold">{suggestedPlan.name} Plan</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Get access to {feature} and more premium features
          </p>
          <ul className="text-sm space-y-1 mb-4">
            {suggestedPlan.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={() => handleUpgrade(suggestedPlan.id)}
            className="w-full"
            size="lg"
          >
            Upgrade to {suggestedPlan.name} - ${suggestedPlan.price}/month
          </Button>
          
          {suggestedPlan.id !== 'enterprise' && (
            <Button 
              variant="outline"
              onClick={() => handleUpgrade('enterprise')}
              className="w-full"
            >
              Or get Enterprise - ${BILLING_PLANS[2].price}/month
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          This is a demo. In production, this would redirect to payment processing.
        </p>
      </Card>
    </motion.div>
  );
}

export function FeatureGate({ 
  feature, 
  fallback, 
  children 
}: { 
  feature: string; 
  fallback: React.ReactNode; 
  children: React.ReactNode; 
}) {
  const { checkFeatureAccess } = useBillingStore();
  const access = checkFeatureAccess(feature);
  
  if (!access.canUseFeature) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

export function LimitReachedPrompt({ 
  limitType, 
  current, 
  limit, 
  requiredPlan 
}: { 
  limitType: string; 
  current: number; 
  limit: number; 
  requiredPlan?: string; 
}) {
  return (
    <UpgradePrompt
      feature={limitType}
      title="Limit Reached"
      description={`You've reached your ${limitType} limit (${current}/${limit}). Upgrade to continue using this feature.`}
      requiredPlan={requiredPlan || 'pro'}
    />
  );
} 