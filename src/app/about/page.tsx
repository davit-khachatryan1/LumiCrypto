'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Zap, Shield, Users, Target, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We push the boundaries of AI and blockchain technology to deliver cutting-edge solutions.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Your data security and privacy are our top priorities in everything we build.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building tools that empower the entire crypto community.'
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'Our AI models are continuously trained to provide the most accurate insights.'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      description: 'Former Google AI researcher with 10+ years in machine learning and fintech.'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO & Co-Founder',
      description: 'Blockchain expert and former Ethereum core developer with deep DeFi knowledge.'
    },
    {
      name: 'Marcus Thompson',
      role: 'Head of AI',
      description: 'PhD in Computer Science, specialized in natural language processing and prediction models.'
    },
    {
      name: 'Emma Park',
      role: 'Head of Design',
      description: 'Award-winning UX designer with experience at leading fintech companies.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Tokens Analyzed', value: '10K+' },
    { label: 'AI Insights Generated', value: '1M+' },
    { label: 'Countries Served', value: '120+' }
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
            About LumiCrypto
          </h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to democratize access to advanced crypto analysis through AI
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                To empower every crypto investor with AI-driven insights that were once only available 
                to institutional players. We believe in making sophisticated analysis accessible, 
                understandable, and actionable for everyone.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="p-6">
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-violet-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
              <p>
                LumiCrypto was born out of frustration with the lack of accessible, sophisticated 
                analysis tools in the crypto space. Our founders, having worked at leading tech 
                companies, saw an opportunity to democratize AI-powered insights.
              </p>
              <p>
                Starting in 2023, we've grown from a small team of passionate developers to a 
                comprehensive platform trusted by thousands of users worldwide. Our commitment 
                to innovation and user-centric design continues to drive everything we do.
              </p>
              <p>
                Today, we're proud to serve investors, traders, and institutions across the globe, 
                helping them navigate the complex world of cryptocurrency with confidence and clarity.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for crypto and AI. 
              Check out our open positions and become part of the LumiCrypto family.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                View Careers
              </button>
              <button className="px-6 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                Contact Us
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 