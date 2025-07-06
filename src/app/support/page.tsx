'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SupportTicket, SupportResponse } from '@/lib/types';
import { 
  HelpCircle, 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Mail,
  Phone,
  Zap,
  Shield,
  Crown,
  FileText,
  Send,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useBillingStore } from '@/lib/store';
import { UpgradePrompt, FeatureGate } from '@/components/UpgradePrompt';

export default function SupportPage() {
  const { address } = useAccount();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentPlan, checkFeatureAccess } = useBillingStore();
  
  const prioritySupportAccess = checkFeatureAccess('priority-support');
  const hasPrioritySupport = prioritySupportAccess.canUseFeature;

  useEffect(() => {
    if (address) {
      fetchTickets();
    }
  }, [address]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/support?userId=${address}`);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch support tickets');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      case 'high': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return AlertCircle;
      case 'high': return Zap;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
      case 'in_progress': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800';
      case 'waiting': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800';
      case 'resolved': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
      case 'closed': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-12">
              <HelpCircle className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect your wallet to access priority support
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                {hasPrioritySupport ? 'Priority Support' : 'Support'}
              </h1>
              <p className="text-muted-foreground">
                {hasPrioritySupport 
                  ? 'Get expert help with priority response times' 
                  : 'Get help from our community and basic support'}
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </div>
        </motion.div>

        {/* Support Plan Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FeatureGate
            feature="priority-support"
            fallback={
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gray-400 to-gray-500">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Basic Support</h3>
                      <p className="text-muted-foreground">Community support with standard response times</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">24-48h</div>
                        <div className="text-sm text-muted-foreground">Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">9-5</div>
                        <div className="text-sm text-muted-foreground">Availability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            }
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{currentPlan.name} Plan Support</h3>
                    <p className="text-muted-foreground">
                      {currentPlan.id === 'enterprise' ? 'Dedicated support with SLA guarantee' : 'Priority response within 2 hours'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {currentPlan.id === 'enterprise' ? '< 1h' : '< 2h'}
                      </div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-sm text-muted-foreground">Availability</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FeatureGate>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tickets</p>
                  <p className="text-2xl font-bold">{tickets.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                  <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{tickets.filter(t => t.status === 'resolved').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">1.2h</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tickets List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading tickets...</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">No tickets yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first support ticket to get help from our team
                  </p>
                  <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Ticket
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => {
                    const PriorityIcon = getPriorityIcon(ticket.priority);
                    return (
                      <div
                        key={ticket.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md hover:bg-muted/50 dark:hover:bg-muted/20 cursor-pointer transition-all duration-200"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <PriorityIcon className={`w-5 h-5 ${getPriorityColor(ticket.priority).split(' ')[0]}`} />
                            <div>
                              <h3 className="font-medium">{ticket.title}</h3>
                              <p className="text-sm text-muted-foreground truncate max-w-md">
                                {ticket.description}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(ticket.priority)}`}>
                                  {ticket.priority}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(ticket.status)}`}>
                                  {ticket.status}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {ticket.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-sm font-medium">
                              {ticket.responses.length} responses
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upgrade Prompt */}
        {!hasPrioritySupport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <UpgradePrompt
              feature="priority-support"
              title="Upgrade to Priority Support"
              description="Get faster response times, dedicated support, and priority handling of your tickets with Pro or Enterprise plans."
              requiredPlan="pro"
            />
          </motion.div>
        )}

        {/* Create Ticket Modal */}
        {showCreateModal && (
          <CreateTicketModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onTicketCreated={(newTicket) => {
              setTickets([newTicket, ...tickets]);
              setShowCreateModal(false);
            }}
            userId={address}
          />
        )}

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <TicketDetailModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onTicketUpdated={(updatedTicket) => {
              setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
              setSelectedTicket(updatedTicket);
            }}
          />
        )}
      </div>
    </div>
  );
}

function CreateTicketModal({ 
  isOpen, 
  onClose, 
  onTicketCreated, 
  userId 
}: {
  isOpen: boolean;
  onClose: () => void;
  onTicketCreated: (ticket: SupportTicket) => void;
  userId: string;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general',
    email: '',
  });

  const createTicket = async () => {
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      });

      if (response.ok) {
        const newTicket = await response.json();
        onTicketCreated(newTicket);
        toast.success('Support ticket created successfully');
      } else {
        toast.error('Failed to create support ticket');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create support ticket');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card text-card-foreground rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Create Support Ticket</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Brief description of your issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="general">General Question</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing & Payments</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please provide detailed information about your issue..."
              rows={4}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button onClick={createTicket} className="flex-1">
            Create Ticket
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function TicketDetailModal({ 
  ticket, 
  onClose, 
  onTicketUpdated 
}: {
  ticket: SupportTicket;
  onClose: () => void;
  onTicketUpdated: (ticket: SupportTicket) => void;
}) {
  const [responseText, setResponseText] = useState('');

  const addResponse = async () => {
    if (!responseText.trim()) return;

    try {
      const response = await fetch('/api/support', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ticket.id,
          response: {
            userId: ticket.userId,
            message: responseText,
            isStaff: false,
          },
        }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        onTicketUpdated(updatedTicket);
        setResponseText('');
        toast.success('Response added successfully');
      } else {
        toast.error('Failed to add response');
      }
    } catch (error) {
      console.error('Error adding response:', error);
      toast.error('Failed to add response');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card text-card-foreground rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{ticket.title}</h2>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
            <span className="text-xs text-muted-foreground">
              {ticket.type}
            </span>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Original Message</p>
            <p>{ticket.description}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Responses ({ticket.responses.length})</h3>
            {ticket.responses.map((response) => (
              <div
                key={response.id}
                className={`p-3 rounded-lg ${
                  response.isStaff 
                    ? 'bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500' 
                    : 'bg-muted border-l-4 border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">
                      {response.isStaff ? 'Support Team' : 'You'}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(response.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{response.message}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Add Response</label>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Type your response here..."
              rows={3}
              className="w-full p-2 border rounded-md"
            />
            <Button onClick={addResponse} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Response
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
    case 'high': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800';
    case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800';
    case 'low': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
    default: return 'text-muted-foreground bg-muted border-border';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'open': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
    case 'in_progress': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800';
    case 'waiting': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800';
    case 'resolved': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
    case 'closed': return 'text-muted-foreground bg-muted border-border';
    default: return 'text-muted-foreground bg-muted border-border';
  }
} 