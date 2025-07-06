'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Team, TeamMember, WhiteLabelSettings } from '@/lib/types';
import { 
  Users, 
  Plus, 
  Settings, 
  Crown, 
  Shield, 
  User, 
  Eye,
  Mail,
  Trash2,
  Edit,
  Palette,
  Globe,
  Key,
  UserPlus,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeamsPage() {
  const { address } = useAccount();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      fetchTeams();
    }
  }, [address]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/teams?userId=${address}`);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'admin': return Shield;
      case 'member': return User;
      case 'viewer': return Eye;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'text-purple-600 bg-purple-50';
      case 'admin': return 'text-blue-600 bg-blue-50';
      case 'member': return 'text-green-600 bg-green-50';
      case 'viewer': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
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
              <Users className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect your wallet to create and manage teams
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
              <h1 className="text-4xl font-bold gradient-text mb-2">Team Management</h1>
              <p className="text-muted-foreground">
                Create teams, invite members, and manage enterprise features
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
        </motion.div>

        {/* Teams List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading teams...</p>
            </div>
          ) : teams.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No teams yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first team to start collaborating with others
                </p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Team
                </Button>
              </motion.div>
            </div>
          ) : (
            teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedTeam(team)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{team.name}</h3>
                        <p className="text-muted-foreground">{team.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {team.ownerId === address && (
                        <Crown className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{team.members.length}</div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{team.settings.integrations.length}</div>
                      <div className="text-sm text-muted-foreground">Integrations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{team.settings.apiKeys.length}</div>
                      <div className="text-sm text-muted-foreground">API Keys</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {team.settings.whiteLabel.enabled && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          White Label
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        Created {new Date(team.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Create Team Modal */}
        {showCreateModal && (
          <CreateTeamModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onTeamCreated={(newTeam) => {
              setTeams([...teams, newTeam]);
              setShowCreateModal(false);
            }}
            userId={address}
          />
        )}

        {/* Team Detail Modal */}
        {selectedTeam && (
          <TeamDetailModal
            team={selectedTeam}
            onClose={() => setSelectedTeam(null)}
            onTeamUpdated={(updatedTeam) => {
              setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
              setSelectedTeam(updatedTeam);
            }}
            currentUserId={address}
          />
        )}
      </div>
    </div>
  );
}

function CreateTeamModal({ 
  isOpen, 
  onClose, 
  onTeamCreated, 
  userId 
}: {
  isOpen: boolean;
  onClose: () => void;
  onTeamCreated: (team: Team) => void;
  userId: string;
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    enableWhiteLabel: false,
    brandName: '',
    primaryColor: '#8B5CF6',
  });

  const createTeam = async () => {
    try {
      const teamData = {
        name: formData.name,
        description: formData.description,
        ownerId: userId,
        settings: {
          whiteLabel: {
            enabled: formData.enableWhiteLabel,
            brandName: formData.brandName || formData.name,
            primaryColor: formData.primaryColor,
            secondaryColor: '#EC4899',
            hideFooter: false,
          },
        },
      };

      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const newTeam = await response.json();
        onTeamCreated(newTeam);
        toast.success('Team created successfully');
      } else {
        toast.error('Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error('Failed to create team');
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
        <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Team Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Acme Corporation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Team description..."
              rows={3}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={formData.enableWhiteLabel}
                onChange={(e) => setFormData({...formData, enableWhiteLabel: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Enable White Label</span>
            </div>

            {formData.enableWhiteLabel && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Brand Name</label>
                  <Input
                    value={formData.brandName}
                    onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                    placeholder="Your Brand Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                    className="w-full h-10 border rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button onClick={createTeam} className="flex-1">
            Create Team
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function TeamDetailModal({ 
  team, 
  onClose, 
  onTeamUpdated, 
  currentUserId 
}: {
  team: Team;
  onClose: () => void;
  onTeamUpdated: (team: Team) => void;
  currentUserId: string;
}) {
  const [activeTab, setActiveTab] = useState('members');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const isOwner = team.ownerId === currentUserId;
  const currentMember = team.members.find(m => m.userId === currentUserId);
  const canManageMembers = isOwner || currentMember?.role === 'admin';

  const tabs = [
    { id: 'members', label: 'Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  const inviteMember = async () => {
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: `user_${Date.now()}`, // In production, resolve from email
      email: inviteEmail,
      role: inviteRole as 'admin' | 'member' | 'viewer',
      permissions: getPermissionsForRole(inviteRole as 'admin' | 'member' | 'viewer'),
      joinedAt: new Date().toISOString(),
      status: 'invited',
    };

    const updatedTeam = {
      ...team,
      members: [...team.members, newMember],
    };

    try {
      const response = await fetch('/api/teams', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeam),
      });

      if (response.ok) {
        const updated = await response.json();
        onTeamUpdated(updated);
        setInviteEmail('');
        toast.success('Member invited successfully');
      } else {
        toast.error('Failed to invite member');
      }
    } catch (error) {
      console.error('Error inviting member:', error);
      toast.error('Failed to invite member');
    }
  };

  const getPermissionsForRole = (role: 'admin' | 'member' | 'viewer'): string[] => {
    switch (role) {
      case 'admin':
        return [
          'team:read',
          'team:write',
          'members:read',
          'members:write',
          'members:invite',
          'settings:read',
          'settings:write',
          'integrations:read',
          'integrations:write',
          'api:read',
          'api:write',
        ];
      case 'member':
        return [
          'team:read',
          'members:read',
          'settings:read',
          'integrations:read',
          'api:read',
        ];
      case 'viewer':
        return ['team:read', 'members:read'];
      default:
        return ['team:read'];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{team.name}</h2>
            <p className="text-muted-foreground">{team.description}</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Team Members</h3>
                {canManageMembers && (
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-48"
                    />
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <Button onClick={inviteMember}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {team.members.map((member) => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">{member.email}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(member.role)}`}>
                          <RoleIcon className="w-3 h-3 inline mr-1" />
                          {member.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">White Label Settings</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">White Label Branding</h4>
                      <p className="text-sm text-muted-foreground">
                        Customize the platform with your branding
                      </p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={team.settings.whiteLabel.enabled}
                        className="sr-only"
                        readOnly
                      />
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        team.settings.whiteLabel.enabled ? 'bg-primary' : 'bg-gray-200'
                      }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            team.settings.whiteLabel.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </label>
                  </div>
                  
                  {team.settings.whiteLabel.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Brand Name</label>
                        <Input
                          value={team.settings.whiteLabel.brandName}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Primary Color</label>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: team.settings.whiteLabel.primaryColor }}
                            />
                            <Input
                              value={team.settings.whiteLabel.primaryColor}
                              readOnly
                              className="bg-gray-50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Secondary Color</label>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: team.settings.whiteLabel.secondaryColor }}
                            />
                            <Input
                              value={team.settings.whiteLabel.secondaryColor}
                              readOnly
                              className="bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">SLA Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Response Time</div>
                        <div className="text-sm text-muted-foreground">
                          {team.settings.sla.responseTime} minutes
                        </div>
                      </div>
                      <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Resolution Time</div>
                        <div className="text-sm text-muted-foreground">
                          {team.settings.sla.resolutionTime} hours
                        </div>
                      </div>
                      <Target className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Integrations</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Integration
                </Button>
              </div>
              
              {team.settings.integrations.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="text-lg font-medium mb-2">No integrations yet</h4>
                  <p className="text-muted-foreground">
                    Connect external services to enhance your workflow
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {team.settings.integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">{integration.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          integration.enabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {integration.enabled ? 'Active' : 'Disabled'}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">API Keys</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Key
                </Button>
              </div>
              
              {team.settings.apiKeys.length === 0 ? (
                <div className="text-center py-12">
                  <Key className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="text-lg font-medium mb-2">No API keys yet</h4>
                  <p className="text-muted-foreground">
                    Generate API keys to access the platform programmatically
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {team.settings.apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Key className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{apiKey.name}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {apiKey.key.substring(0, 20)}...
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          apiKey.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {apiKey.isActive ? 'Active' : 'Disabled'}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 