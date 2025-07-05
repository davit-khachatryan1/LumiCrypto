'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({ className, message, size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      <div className="relative">
        <motion.div
          className={cn(
            'rounded-full border-2 border-primary/20 border-t-primary',
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-transparent border-r-violet-400',
            sizeClasses[size]
          )}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {message && (
        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="loading-shimmer rounded-lg h-full w-full" />
    </div>
  );
}

export function TokenCardSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-600 rounded-full loading-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-600 rounded loading-shimmer" />
          <div className="h-3 bg-gray-600 rounded w-2/3 loading-shimmer" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-600 rounded w-16 loading-shimmer" />
          <div className="h-3 bg-gray-600 rounded w-12 loading-shimmer" />
        </div>
      </div>
    </div>
  );
} 