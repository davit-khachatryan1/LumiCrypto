'use client';

import { motion } from 'framer-motion';
import { AIAnalysis } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { getRiskColor, getRiskLabel } from '@/lib/utils';
import { Brain, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface AIAnalysisCardProps {
  analysis: AIAnalysis;
  title?: string;
}

export function AIAnalysisCard({ analysis, title = "AI Analysis" }: AIAnalysisCardProps) {
  const getRiskGradient = (score: number) => {
    const percentage = score;
    return `linear-gradient(to right, #10b981 0%, #f59e0b ${percentage/2}%, #ef4444 ${percentage}%)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Risk Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-medium">Risk Assessment</span>
              <div className="text-right">
                <span className={`text-2xl font-bold ${getRiskColor(analysis.risk_score)}`}>
                  {analysis.risk_score}/100
                </span>
                <p className="text-sm text-muted-foreground">
                  {getRiskLabel(analysis.risk_score)}
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className="h-3 rounded-full"
                  style={{ background: getRiskGradient(analysis.risk_score) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.risk_score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div 
                className="absolute top-0 w-1 h-3 bg-white rounded-full shadow-lg"
                style={{ left: `${analysis.risk_score}%`, transform: 'translateX(-50%)' }}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Recommendation */}
          <div className="mb-6 p-4 rounded-lg bg-muted/20">
            <div className="flex items-center space-x-2 mb-2">
              {analysis.recommendation === 'buy' && <TrendingUp className="w-4 h-4 text-green-400" />}
              {analysis.recommendation === 'sell' && <TrendingDown className="w-4 h-4 text-red-400" />}
              {analysis.recommendation === 'hold' && <div className="w-4 h-4 rounded-full bg-yellow-400" />}
              {analysis.recommendation === 'caution' && <AlertTriangle className="w-4 h-4 text-orange-400" />}
              <span className="font-medium capitalize">{analysis.recommendation}</span>
              <span className="text-sm text-muted-foreground">
                (Confidence: {analysis.confidence}%)
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on current market conditions and risk analysis
            </p>
          </div>

          {/* Strengths and Risk Factors */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center text-green-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {strength}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 flex items-center text-red-400">
                <XCircle className="w-4 h-4 mr-2" />
                Risk Factors
              </h4>
              <ul className="space-y-2">
                {analysis.risk_factors.map((factor, index) => (
                  <motion.li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {factor}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Red Flags */}
          {analysis.red_flags && analysis.red_flags.length > 0 && (
            <motion.div
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-medium mb-2 flex items-center text-red-400">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Critical Red Flags
              </h4>
              <ul className="space-y-1">
                {analysis.red_flags.map((flag, index) => (
                  <li key={index} className="text-sm text-red-300 flex items-start">
                    <span className="mr-2">⚠️</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Community Sentiment */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Community Sentiment:</span>
            <span className={`font-medium capitalize ${
              analysis.community_sentiment === 'positive' ? 'text-green-400' :
              analysis.community_sentiment === 'negative' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              {analysis.community_sentiment}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 