'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, Users, Globe, Heart, Zap, Code, Database } from 'lucide-react';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior AI Engineer',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Join our AI team to build cutting-edge machine learning models for crypto analysis.',
      requirements: [
        '5+ years experience in ML/AI',
        'Python, TensorFlow, PyTorch',
        'Experience with financial data',
        'PhD in Computer Science preferred'
      ],
      icon: Zap
    },
    {
      title: 'Senior Frontend Developer',
      location: 'Remote / New York',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Build beautiful, responsive interfaces for our crypto analysis platform.',
      requirements: [
        '4+ years React/Next.js experience',
        'TypeScript, Tailwind CSS',
        'Experience with data visualization',
        'Strong UX/UI skills'
      ],
      icon: Code
    },
    {
      title: 'Blockchain Data Engineer',
      location: 'Remote / London',
      type: 'Full-time',
      department: 'Data',
      description: 'Design and maintain our blockchain data infrastructure and pipelines.',
      requirements: [
        '3+ years blockchain data experience',
        'Ethereum, Solidity knowledge',
        'Python, SQL, Apache Spark',
        'Experience with DeFi protocols'
      ],
      icon: Database
    },
    {
      title: 'Product Manager',
      location: 'San Francisco',
      type: 'Full-time',
      department: 'Product',
      description: 'Drive product strategy and roadmap for our AI-powered crypto tools.',
      requirements: [
        '3+ years product management',
        'FinTech or crypto experience',
        'Strong analytical skills',
        'Experience with AI/ML products'
      ],
      icon: Users
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Remote-First',
      description: 'Work from anywhere in the world with flexible hours'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs'
    },
    {
      icon: Zap,
      title: 'Learning & Growth',
      description: 'Annual learning budget and conference attendance'
    },
    {
      icon: Users,
      title: 'Equity & Ownership',
      description: 'Competitive equity package for all team members'
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
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground">
            Help us build the future of AI-powered crypto analysis
          </p>
        </motion.div>

        {/* Company Culture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Why LumiCrypto?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We're a team of passionate individuals building the next generation of crypto analysis tools. 
                Join us in democratizing access to sophisticated AI-powered insights.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="p-6">
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <position.icon className="w-12 h-12 text-primary mt-2" />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{position.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{position.type}</span>
                          </div>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {position.department}
                          </span>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0">
                        Apply Now
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* No Perfect Match */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Don't See a Perfect Match?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for crypto and AI. 
              Send us your resume and tell us how you'd like to contribute to LumiCrypto.
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Send Resume</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 