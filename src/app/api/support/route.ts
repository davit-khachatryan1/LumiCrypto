import { NextRequest, NextResponse } from 'next/server';
import { SupportTicket, SupportResponse, UserPlan } from '@/lib/types';

// Mock databases - in production, use a real database
let supportTickets: SupportTicket[] = [];
let userPlans: UserPlan[] = [];

// Mock user plans for demonstration
const initializeUserPlans = () => {
  if (userPlans.length === 0) {
    userPlans = [
      {
        id: 'plan_1',
        userId: 'user_1',
        planType: 'free',
        features: ['basic_analysis', 'portfolio_tracking'],
        limits: {
          tokensPerDay: 10,
          alertsLimit: 3,
          apiCalls: 100,
        },
        supportLevel: 'standard',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'plan_2',
        userId: 'user_2',
        planType: 'pro',
        features: ['unlimited_analysis', 'advanced_insights', 'priority_support'],
        limits: {
          tokensPerDay: -1,
          alertsLimit: 50,
          apiCalls: 1000,
        },
        supportLevel: 'priority',
        createdAt: new Date().toISOString(),
      },
    ];
  }
};

const getUserPlan = (userId: string): UserPlan | undefined => {
  initializeUserPlans();
  return userPlans.find(plan => plan.userId === userId);
};

const getSupportPriority = (userPlan: UserPlan | undefined, ticketType: string): 'low' | 'medium' | 'high' | 'urgent' => {
  if (!userPlan) return 'low';
  
  if (userPlan.planType === 'enterprise') {
    return ticketType === 'technical' ? 'urgent' : 'high';
  }
  
  if (userPlan.planType === 'pro') {
    return ticketType === 'technical' ? 'high' : 'medium';
  }
  
  return 'low';
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let userTickets = supportTickets.filter(ticket => ticket.userId === userId);
    
    if (status) {
      userTickets = userTickets.filter(ticket => ticket.status === status);
    }

    // Sort by priority and creation date
    userTickets.sort((a, b) => {
      const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json(userTickets);
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, description, attachments } = body;

    if (!userId || !type || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userPlan = getUserPlan(userId);
    const priority = getSupportPriority(userPlan, type);

    const newTicket: SupportTicket = {
      id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      priority,
      status: 'open',
      title,
      description,
      attachments: attachments || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
    };

    supportTickets.push(newTicket);

    // Send notification based on priority
    if (priority === 'urgent' || priority === 'high') {
      console.log(`HIGH PRIORITY TICKET: ${newTicket.id} - ${title}`);
      // In production, integrate with notification system
    }

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Error creating support ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, assignedTo, response } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Ticket ID is required' },
        { status: 400 }
      );
    }

    const ticketIndex = supportTickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    const ticket = supportTickets[ticketIndex];
    
    // Update ticket
    if (status) ticket.status = status;
    if (assignedTo) ticket.assignedTo = assignedTo;
    ticket.updatedAt = new Date().toISOString();

    // Add response if provided
    if (response) {
      const newResponse: SupportResponse = {
        id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ticketId: id,
        userId: response.userId,
        message: response.message,
        isStaff: response.isStaff || false,
        createdAt: new Date().toISOString(),
        attachments: response.attachments || [],
      };
      ticket.responses.push(newResponse);
    }

    supportTickets[ticketIndex] = ticket;

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error updating support ticket:', error);
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

    if (!id) {
      return NextResponse.json(
        { error: 'Ticket ID is required' },
        { status: 400 }
      );
    }

    const ticketIndex = supportTickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    supportTickets.splice(ticketIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting support ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 