'use client';

import { motion } from 'framer-motion';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Settings, 
  Moon, 
  Sun, 
  Palette, 
  Bell, 
  Shield, 
  Wallet,
  Database,
  Globe,
  User,
  Mail,
  Phone,
  Save,
  Trash2,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { 
    theme, 
    setTheme, 
    favorites,
    setFilters
  } = useStore();

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleDisconnectWallet = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  const handleClearData = () => {
    // Clear all stored data
    setFilters({
      chain: 'all',
      category: 'all',
      sortBy: 'market_cap',
      sortOrder: 'desc'
    });
    toast.success('All data cleared');
  };

  const handleExportData = () => {
    const data = {
      favorites,
      theme,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumicrypto-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully');
  };

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          name: 'Theme',
          description: 'Switch between light and dark mode',
          component: (
            <Button
              variant="outline"
              size="sm"
              onClick={handleThemeToggle}
              className="flex items-center space-x-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </>
              )}
            </Button>
          )
        }
      ]
    },
    {
      title: 'Profile',
      icon: User,
      settings: [
        {
          name: 'Email',
          description: 'Your email address for notifications',
          component: (
            <div className="flex items-center space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button size="sm">
                <Save className="w-4 h-4" />
              </Button>
            </div>
          )
        },
        {
          name: 'Phone',
          description: 'Phone number for alerts',
          component: (
            <div className="flex items-center space-x-2">
              <Input 
                type="tel" 
                placeholder="Enter phone number"
                className="flex-1"
              />
              <Button size="sm">
                <Save className="w-4 h-4" />
              </Button>
            </div>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          name: 'Price Alerts',
          description: 'Get notified when prices change',
          component: (
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Enable price alerts</span>
            </div>
          )
        },
        {
          name: 'Portfolio Updates',
          description: 'Weekly portfolio performance reports',
          component: (
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Enable portfolio updates</span>
            </div>
          )
        }
      ]
    },
    {
      title: 'Wallet',
      icon: Wallet,
      settings: [
        {
          name: 'Connected Wallet',
          description: 'Manage your connected wallet',
          component: (
            <div className="space-y-3">
              {isConnected ? (
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={handleDisconnectWallet}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-muted/20 border border-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">No wallet connected</span>
                  <ConnectButton />
                </div>
              )}
            </div>
          )
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          name: 'Data Privacy',
          description: 'Control how your data is used',
          component: (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Allow analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Share anonymized data</span>
              </div>
            </div>
          )
        }
      ]
    },
    {
      title: 'Data Management',
      icon: Database,
      settings: [
        {
          name: 'Export Data',
          description: 'Download your data and settings',
          component: (
            <Button size="sm" variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )
        },
        {
          name: 'Clear Data',
          description: 'Remove all stored data and reset preferences',
          component: (
            <Button size="sm" variant="destructive" onClick={handleClearData}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid gap-6">
          {settingSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.settings.map((setting, settingIndex) => (
                      <div key={setting.name} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{setting.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {setting.component}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 