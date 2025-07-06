import { NextRequest, NextResponse } from 'next/server';
import { Team, TeamMember, TeamSettings } from '@/lib/types';

// Mock database - in production, use a real database
let teams: Team[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find teams where user is a member
    const userTeams = teams.filter(team => 
      team.members.some(member => member.userId === userId)
    );

    return NextResponse.json(userTeams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, ownerId, settings } = body;

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const defaultSettings: TeamSettings = {
      whiteLabel: {
        enabled: false,
        brandName: name,
        primaryColor: '#8B5CF6',
        secondaryColor: '#EC4899',
        hideFooter: false,
      },
      integrations: [],
      apiKeys: [],
      sla: {
        responseTime: 120, // 2 hours
        resolutionTime: 24, // 24 hours
        availabilityTarget: 99.9,
        monitoring: true,
      },
    };

    const ownerMember: TeamMember = {
      id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: ownerId,
      email: `${ownerId}@example.com`, // In production, get from user profile
      role: 'owner',
      permissions: [
        'team:read',
        'team:write',
        'team:delete',
        'members:read',
        'members:write',
        'members:invite',
        'members:remove',
        'settings:read',
        'settings:write',
        'integrations:read',
        'integrations:write',
        'api:read',
        'api:write',
      ],
      joinedAt: new Date().toISOString(),
      status: 'active',
    };

    const newTeam: Team = {
      id: `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      ownerId,
      members: [ownerMember],
      settings: { ...defaultSettings, ...settings },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    teams.push(newTeam);

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const teamIndex = teams.findIndex(team => team.id === id);
    if (teamIndex === -1) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    teams[teamIndex] = {
      ...teams[teamIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(teams[teamIndex]);
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'Team ID and User ID are required' },
        { status: 400 }
      );
    }

    const teamIndex = teams.findIndex(team => team.id === id);
    if (teamIndex === -1) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    const team = teams[teamIndex];
    
    // Only team owner can delete the team
    if (team.ownerId !== userId) {
      return NextResponse.json(
        { error: 'Only team owner can delete the team' },
        { status: 403 }
      );
    }

    teams.splice(teamIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 