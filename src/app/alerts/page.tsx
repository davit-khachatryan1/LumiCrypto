'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CustomAlert, AlertCondition, AlertAction } from '@/lib/types';
import { 
  Bell, 
  Plus, 
  Settings, 
  Trash2, 
  Edit, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  Mail,
  MessageSquare,
  Smartphone,
  Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AlertsPage() {
  const { address } = useAccount();
  const [alerts, setAlerts] = useState<CustomAlert[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      fetchAlerts();
    }
  }, [address]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/alerts?userId=${address}`);
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast.error('Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const deleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts?id=${alertId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
        toast.success('Alert deleted successfully');
      } else {
        toast.error('Failed to delete alert');
      }
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast.error('Failed to delete alert');
    }
  };

  const toggleAlert = async (alertId: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: alertId, isActive }),
      });

      if (response.ok) {
        setAlerts(alerts.map(alert => 
          alert.id === alertId ? { ...alert, isActive } : alert
        ));
        toast.success(`Alert ${isActive ? 'enabled' : 'disabled'}`);
      } else {
        toast.error('Failed to update alert');
      }
    } catch (error) {
      console.error('Error updating alert:', error);
      toast.error('Failed to update alert');
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price': return DollarSign;
      case 'portfolio': return BarChart3;
      case 'market': return TrendingUp;
      case 'news': return MessageSquare;
      default: return Bell;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return Smartphone;
      case 'push': return Bell;
      case 'webhook': return Globe;
      default: return Bell;
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
              <Bell className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect your wallet to manage custom alerts and notifications
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
              <h1 className="text-4xl font-bold gradient-text mb-2">Custom Alerts</h1>
              <p className="text-muted-foreground">
                Stay informed with personalized price and portfolio alerts
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                </div>
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">{alerts.filter(a => a.isActive).length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
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
                  <p className="text-sm text-muted-foreground">Triggered Today</p>
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-sm text-muted-foreground">Total Triggers</p>
                  <p className="text-2xl font-bold">{alerts.reduce((sum, a) => sum + a.triggerCount, 0)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Alerts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Your Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading alerts...</p>
                </div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">No alerts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first alert to get notified about price changes and portfolio updates
                  </p>
                  <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Alert
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => {
                    const AlertIcon = getAlertIcon(alert.type);
                    return (
                      <div
                        key={alert.id}
                        className={`p-4 border rounded-lg ${
                          alert.isActive 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <AlertIcon className={`w-5 h-5 ${
                              alert.isActive ? 'text-green-600' : 'text-gray-400'
                            }`} />
                            <div>
                              <h3 className="font-medium">{alert.name}</h3>
                              <p className="text-sm text-muted-foreground">{alert.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  alert.isActive 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {alert.type}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Triggered {alert.triggerCount} times
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {alert.actions.map((action, index) => {
                                const ActionIcon = getActionIcon(action.type);
                                return (
                                  <ActionIcon
                                    key={index}
                                    className={`w-4 h-4 ${
                                      action.enabled ? 'text-primary' : 'text-gray-400'
                                    }`}
                                  />
                                );
                              })}
                            </div>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={alert.isActive}
                                onChange={(e) => toggleAlert(alert.id, e.target.checked)}
                                className="sr-only"
                              />
                              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                alert.isActive ? 'bg-primary' : 'bg-gray-200'
                              }`}>
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    alert.isActive ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </div>
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteAlert(alert.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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

        {/* Create Alert Modal */}
        {showCreateModal && (
          <CreateAlertModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onAlertCreated={(newAlert) => {
              setAlerts([...alerts, newAlert]);
              setShowCreateModal(false);
            }}
            userId={address}
          />
        )}
      </div>
    </div>
  );
}

function CreateAlertModal({ 
  isOpen, 
  onClose, 
  onAlertCreated, 
  userId 
}: {
  isOpen: boolean;
  onClose: () => void;
  onAlertCreated: (alert: CustomAlert) => void;
  userId: string;
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'price',
    token: '',
    condition: 'price_above',
    value: '',
    email: '',
    enableEmail: true,
    enablePush: false,
  });

  const createAlert = async () => {
    try {
      const alertData = {
        userId,
        type: formData.type,
        name: formData.name,
        description: formData.description,
        conditions: [{
          id: `condition_${Date.now()}`,
          type: formData.condition,
          token: formData.token,
          value: parseFloat(formData.value),
          operator: 'greater_than',
        }],
        actions: [{
          id: `action_${Date.now()}`,
          type: 'email',
          enabled: formData.enableEmail,
          settings: {
            email: formData.email,
          },
        }],
      };

      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });

      if (response.ok) {
        const newAlert = await response.json();
        onAlertCreated(newAlert);
        toast.success('Alert created successfully');
      } else {
        toast.error('Failed to create alert');
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      toast.error('Failed to create alert');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Alert</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Alert Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Bitcoin Price Alert"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Alert when Bitcoin goes above $50,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Alert Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="price">Price Alert</option>
              <option value="portfolio">Portfolio Alert</option>
              <option value="market">Market Alert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Token Symbol</label>
            <Input
              value={formData.token}
              onChange={(e) => setFormData({...formData, token: e.target.value})}
              placeholder="BTC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Condition</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="price_above">Price Above</option>
              <option value="price_below">Price Below</option>
              <option value="price_change">Price Change %</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Value</label>
            <Input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.enableEmail}
              onChange={(e) => setFormData({...formData, enableEmail: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-sm">Enable email notifications</span>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button onClick={createAlert} className="flex-1">
            Create Alert
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 