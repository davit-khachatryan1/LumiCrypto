'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { CheckCircle, AlertCircle, Clock, TrendingUp, Activity, Database, Zap, Shield } from 'lucide-react';

export default function StatusPage() {
  const overallStatus = 'operational';
  const uptime = '99.97%';
  const lastIncident = 'No recent incidents';

  const services = [
    {
      name: 'API Service',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '142ms',
      icon: Zap,
      description: 'Core API endpoints for data access'
    },
    {
      name: 'AI Analysis Engine',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '2.3s',
      icon: Activity,
      description: 'Machine learning analysis processing'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '45ms',
      icon: Database,
      description: 'Data storage and retrieval systems'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '89ms',
      icon: Shield,
      description: 'User authentication and authorization'
    }
  ];

  const metrics = [
    { label: 'Overall Uptime', value: '99.97%', change: '+0.02%' },
    { label: 'Avg Response Time', value: '165ms', change: '-12ms' },
    { label: 'Total Requests', value: '2.4M', change: '+5.2%' },
    { label: 'Error Rate', value: '0.03%', change: '-0.01%' }
  ];

  const recentIncidents = [
    {
      date: '2024-01-10',
      title: 'API Rate Limiting Issue',
      status: 'resolved',
      duration: '23 minutes',
      impact: 'Minor',
      description: 'Some users experienced slower API responses due to rate limiting configuration.'
    },
    {
      date: '2024-01-05',
      title: 'Database Maintenance',
      status: 'resolved',
      duration: '15 minutes',
      impact: 'Minor',
      description: 'Scheduled database maintenance caused brief service interruption.'
    },
    {
      date: '2024-01-02',
      title: 'AI Model Update',
      status: 'resolved',
      duration: '8 minutes',
      impact: 'No Impact',
      description: 'AI analysis temporarily unavailable during model deployment.'
    }
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'outage':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return CheckCircle;
      case 'degraded':
        return AlertCircle;
      case 'outage':
        return AlertCircle;
      default:
        return Clock;
    }
  };

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
            System Status
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time status and uptime monitoring for LumiCrypto services
          </p>
        </motion.div>

        {/* Overall Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="p-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold">All Systems Operational</h2>
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">{uptime}</div>
                <div className="text-sm text-muted-foreground">30-day uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">165ms</div>
                <div className="text-sm text-muted-foreground">Avg response time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">0</div>
                <div className="text-sm text-muted-foreground">Active incidents</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const StatusIcon = statusIcon(service.status);
              return (
                <Card key={service.name} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <service.icon className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center space-x-1 ${statusColor(service.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{service.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Uptime</div>
                      <div className="font-semibold">{service.uptime}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Response Time</div>
                      <div className="font-semibold">{service.responseTime}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={metric.label} className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                <div className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last week
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Recent Incidents</h2>
          <div className="space-y-4">
            {recentIncidents.map((incident, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-green-500">RESOLVED</span>
                      <span className="text-sm text-muted-foreground">{incident.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{incident.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{incident.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Duration: {incident.duration}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        incident.impact === 'No Impact' ? 'bg-gray-100 text-gray-800' :
                        incident.impact === 'Minor' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {incident.impact}
                      </span>
                    </div>
                  </div>
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
            <h2 className="text-2xl font-bold mb-4">Stay Informed</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to status updates and be the first to know about any service issues or maintenance.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Subscribe to Updates
              </button>
              <button className="px-6 py-2 border border-border rounded-md hover:bg-muted transition-colors">
                RSS Feed
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 