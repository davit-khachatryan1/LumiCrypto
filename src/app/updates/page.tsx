'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Star, Zap, Shield, Users, ArrowUpRight, Plus, Fix, Trash2 } from 'lucide-react';

export default function UpdatesPage() {
  const releases = [
    {
      version: '2.4.0',
      date: '2024-01-15',
      title: 'Enhanced AI Analysis & New Charts',
      type: 'major',
      features: [
        { type: 'new', text: 'Advanced portfolio correlation analysis' },
        { type: 'new', text: 'Interactive candlestick charts with volume' },
        { type: 'new', text: 'Risk assessment visualization' },
        { type: 'improved', text: 'AI model accuracy increased by 15%' },
        { type: 'improved', text: 'Faster API response times' },
        { type: 'fixed', text: 'Token search performance issues' }
      ],
      highlights: [
        'New AI analysis engine with improved accuracy',
        'Enhanced charting capabilities',
        'Better portfolio insights'
      ]
    },
    {
      version: '2.3.2',
      date: '2024-01-08',
      title: 'Bug Fixes & Performance Improvements',
      type: 'patch',
      features: [
        { type: 'fixed', text: 'Dashboard loading performance' },
        { type: 'fixed', text: 'Mobile responsive issues' },
        { type: 'improved', text: 'Token data synchronization' },
        { type: 'improved', text: 'Error handling and user feedback' }
      ],
      highlights: [
        'Improved mobile experience',
        'Better error handling',
        'Performance optimizations'
      ]
    },
    {
      version: '2.3.0',
      date: '2024-01-01',
      title: 'New Year, New Features',
      type: 'minor',
      features: [
        { type: 'new', text: 'Dark mode toggle in settings' },
        { type: 'new', text: 'Export portfolio data as CSV' },
        { type: 'new', text: 'Custom alert notifications' },
        { type: 'improved', text: 'Search functionality with filters' },
        { type: 'improved', text: 'Token detail pages with more metrics' }
      ],
      highlights: [
        'Dark mode support',
        'Data export capabilities',
        'Enhanced search and filtering'
      ]
    },
    {
      version: '2.2.1',
      date: '2023-12-20',
      title: 'Holiday Update',
      type: 'patch',
      features: [
        { type: 'new', text: 'Holiday-themed UI elements' },
        { type: 'fixed', text: 'Wallet connection stability' },
        { type: 'fixed', text: 'Chart rendering on Safari' },
        { type: 'improved', text: 'Loading states and animations' }
      ],
      highlights: [
        'Improved wallet connectivity',
        'Better browser compatibility',
        'Enhanced user experience'
      ]
    },
    {
      version: '2.2.0',
      date: '2023-12-15',
      title: 'Community Features & API Updates',
      type: 'minor',
      features: [
        { type: 'new', text: 'Community discussion forums' },
        { type: 'new', text: 'Public API beta release' },
        { type: 'new', text: 'Leaderboard and user rankings' },
        { type: 'improved', text: 'AI analysis explanations' },
        { type: 'improved', text: 'Multi-language support preparation' }
      ],
      highlights: [
        'Community platform launch',
        'API beta program',
        'Enhanced AI insights'
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'new':
        return Plus;
      case 'improved':
        return ArrowUpRight;
      case 'fixed':
        return Fix;
      case 'removed':
        return Trash2;
      default:
        return Star;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new':
        return 'text-green-500';
      case 'improved':
        return 'text-blue-500';
      case 'fixed':
        return 'text-orange-500';
      case 'removed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'patch':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Total Releases', value: '45', icon: Star },
    { label: 'Features Added', value: '120+', icon: Plus },
    { label: 'Bugs Fixed', value: '200+', icon: Fix },
    { label: 'Active Users', value: '50K+', icon: Users }
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
            Platform Updates
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay up to date with the latest features, improvements, and fixes
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Latest Release Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Latest Release</h2>
                <p className="text-muted-foreground">Version {releases[0].version} - {releases[0].date}</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">{releases[0].title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {releases[0].highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Release History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Release History</h2>
          <div className="space-y-8">
            {releases.map((release, index) => (
              <Card key={release.version} className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-violet-400 rounded-lg flex items-center justify-center text-white font-bold">
                      v{release.version.split('.')[1]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">Version {release.version}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVersionBadge(release.type)}`}>
                          {release.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">{release.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{release.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="space-y-3">
                  {release.features.map((feature, featureIndex) => {
                    const Icon = getTypeIcon(feature.type);
                    return (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Icon className={`w-4 h-4 mt-1 ${getTypeColor(feature.type)}`} />
                        <div>
                          <span className={`text-xs font-medium uppercase ${getTypeColor(feature.type)}`}>
                            {feature.type}
                          </span>
                          <p className="text-sm text-muted-foreground">{feature.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our update notifications and be the first to know about new features, improvements, and important changes.
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Subscribe to Updates</Button>
              <Button variant="outline">View Roadmap</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 