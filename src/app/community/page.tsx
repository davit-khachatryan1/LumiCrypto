'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Users, Trophy, Star, Github, Twitter, Calendar, TrendingUp } from 'lucide-react';

export default function CommunityPage() {
  const communityStats = [
    { label: 'Active Members', value: '25K+', icon: Users },
    { label: 'Daily Messages', value: '1,200+', icon: MessageCircle },
    { label: 'Top Contributors', value: '150+', icon: Star },
    { label: 'Community Projects', value: '30+', icon: Trophy }
  ];

  const platforms = [
    {
      name: 'Discord',
      description: 'Real-time chat with fellow crypto enthusiasts',
      members: '18K members',
      activity: 'Very Active',
      icon: MessageCircle,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Forum',
      description: 'In-depth discussions and analysis sharing',
      members: '12K members',
      activity: 'Active',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Twitter',
      description: 'Daily insights and platform updates',
      members: '8K followers',
      activity: 'Daily Posts',
      icon: Twitter,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'GitHub',
      description: 'Open source tools and contributions',
      members: '500+ stars',
      activity: 'Weekly Updates',
      icon: Github,
      color: 'from-gray-600 to-gray-800'
    }
  ];

  const featuredDiscussions = [
    {
      title: 'DeFi Risk Analysis: Best Practices',
      author: 'CryptoAnalyst',
      replies: 43,
      views: 1205,
      lastActive: '2 hours ago',
      category: 'Analysis'
    },
    {
      title: 'AI Model Performance: January Results',
      author: 'AIResearcher',
      replies: 28,
      views: 892,
      lastActive: '4 hours ago',
      category: 'AI & ML'
    },
    {
      title: 'Portfolio Optimization Strategies',
      author: 'InvestorPro',
      replies: 67,
      views: 1543,
      lastActive: '6 hours ago',
      category: 'Investment'
    },
    {
      title: 'New Feature Request: Custom Alerts',
      author: 'PowerUser',
      replies: 15,
      views: 234,
      lastActive: '1 day ago',
      category: 'Feature Request'
    }
  ];

  const leaderboard = [
    { name: 'CryptoGuru', points: 2450, badge: 'Expert Analyst', rank: 1 },
    { name: 'AIEnthusiast', points: 2180, badge: 'AI Specialist', rank: 2 },
    { name: 'DeFiMaster', points: 1950, badge: 'DeFi Expert', rank: 3 },
    { name: 'ChartWizard', points: 1720, badge: 'Technical Analyst', rank: 4 },
    { name: 'TokenHunter', points: 1580, badge: 'Token Researcher', rank: 5 }
  ];

  const upcomingEvents = [
    {
      title: 'Monthly Community Call',
      date: 'Jan 25, 2024',
      time: '3:00 PM UTC',
      type: 'Virtual Meeting'
    },
    {
      title: 'DeFi Analysis Workshop',
      date: 'Jan 28, 2024',
      time: '2:00 PM UTC',
      type: 'Workshop'
    },
    {
      title: 'AI Model Training Session',
      date: 'Feb 02, 2024',
      time: '4:00 PM UTC',
      type: 'Educational'
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
            LumiCrypto Community
          </h1>
          <p className="text-xl text-muted-foreground">
            Join thousands of crypto enthusiasts sharing insights and building the future together
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => (
            <Card key={stat.label} className="p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Community Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Join Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <Card key={platform.name} className="overflow-hidden">
                <div className={`h-32 bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                  <platform.icon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                  <p className="text-muted-foreground mb-4">{platform.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">{platform.members}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {platform.activity}
                    </span>
                  </div>
                  <Button className="w-full">Join {platform.name}</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Featured Discussions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Discussions</h2>
          <div className="space-y-4">
            {featuredDiscussions.map((discussion, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {discussion.category}
                      </span>
                      <span className="text-sm text-muted-foreground">by {discussion.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.views} views</span>
                      <span>Last active {discussion.lastActive}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Join Discussion</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard and Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Leaderboard */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Top Contributors</h3>
            </div>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-violet-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.rank}
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.badge}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{user.points}</div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Upcoming Events</h3>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">{event.title}</h4>
                  <div className="text-sm text-muted-foreground">
                    <div>{event.date} at {event.time}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with like-minded crypto enthusiasts, share your insights, and learn from the community.
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Join Discord</Button>
              <Button variant="outline">Browse Forum</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 