import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Event from '@/models/Event'
import Ticket from '@/models/Ticket'
import { hashPassword } from '@/lib/password'

export async function POST(_req: NextRequest) {
  try {
    await connectDB()

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@roboticsevent.com',
      password: await hashPassword('Admin123!'),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isEmailVerified: true,
    })

    // Create organizer user
    const organizerUser = await User.create({
      email: 'organizer@roboticsevent.com',
      password: await hashPassword('Organizer123!'),
      firstName: 'Tech',
      lastName: 'Organizer',
      role: 'organizer',
      isEmailVerified: true,
    })

    // Demo events data - Robotics themed
    const demoEvents = [
      {
        title: 'International Robotics Symposium 2026',
        description: 'Join us for the biggest robotics conference of the year. Learn about the latest advancements in AI, machine learning, and robotic automation. Network with industry leaders and innovators.',
        slug: 'international-robotics-symposium-2026',
        organizerId: organizerUser._id,
        category: 'Conference',
        startDate: new Date('2026-06-15T09:00:00Z'),
        endDate: new Date('2026-06-17T17:00:00Z'),
        timezone: 'America/New_York',
        location: {
          venue: 'Convention Center Hall A',
          address: '123 Tech Drive',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA',
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
        },
        capacity: 500,
        registeredCount: 234,
        totalRevenue: 11700,
        status: 'published',
        visibility: 'public',
        tags: ['robotics', 'AI', 'automation', 'technology'],
        image: 'https://images.unsplash.com/photo-1620712014386-a46db6195736?w=800',
      },
      {
        title: 'Advanced Robot Programming Workshop',
        description: 'Hands-on workshop covering ROS, Python, and C++ for robotics development. Learn from industry professionals how to build and control intelligent robots.',
        slug: 'advanced-robot-programming-workshop',
        organizerId: organizerUser._id,
        category: 'Workshop',
        startDate: new Date('2026-05-20T10:00:00Z'),
        endDate: new Date('2026-05-22T16:00:00Z'),
        timezone: 'America/New_York',
        location: {
          venue: 'Innovation Lab Building',
          address: '456 Silicon Valley Blvd',
          city: 'Mountain View',
          state: 'CA',
          zipCode: '94043',
          country: 'USA',
          coordinates: {
            latitude: 37.4419,
            longitude: -122.143,
          },
        },
        capacity: 100,
        registeredCount: 87,
        totalRevenue: 8700,
        status: 'published',
        visibility: 'public',
        tags: ['workshop', 'programming', 'ROS', 'python'],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      },
      {
        title: 'MegaRobo Championship 2026',
        description: 'The ultimate robotics competition! Teams from around the world compete in autonomous navigation, object manipulation, and speed challenges. Prizes up to $500,000!',
        slug: 'megarobo-championship-2026',
        organizerId: organizerUser._id,
        category: 'Competition',
        startDate: new Date('2026-07-10T08:00:00Z'),
        endDate: new Date('2026-07-12T20:00:00Z'),
        timezone: 'America/Chicago',
        location: {
          venue: 'Chicago Robotics Arena',
          address: '789 Tech Plaza',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
          coordinates: {
            latitude: 41.8781,
            longitude: -87.6298,
          },
        },
        capacity: 2000,
        registeredCount: 1520,
        totalRevenue: 30400,
        status: 'published',
        visibility: 'public',
        tags: ['competition', 'robotics', 'challenge', 'awards'],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      },
      {
        title: 'AI & Machine Learning in Robotics Webinar',
        description: 'Virtual seminar exploring cutting-edge AI technologies powering the next generation of robots. Expert speakers will discuss neural networks, computer vision, and autonomous decision-making.',
        slug: 'ai-machine-learning-robotics-webinar',
        organizerId: organizerUser._id,
        category: 'Webinar',
        startDate: new Date('2026-05-05T14:00:00Z'),
        endDate: new Date('2026-05-05T16:00:00Z'),
        timezone: 'UTC',
        location: {
          venue: 'Online - Zoom',
          address: 'Virtual Event',
          city: 'Global',
          state: 'Online',
          zipCode: '',
          country: 'Worldwide',
        },
        capacity: 5000,
        registeredCount: 3245,
        totalRevenue: 0,
        status: 'published',
        visibility: 'public',
        tags: ['webinar', 'AI', 'machine-learning', 'online'],
        image: 'https://images.unsplash.com/photo-1677442d019cecf8e5c1e0dcaf37d67ffc882d420?w=800',
      },
      {
        title: 'Robotics Startup Meetup',
        description: 'Networking event for robotics startups, investors, and enthusiasts. Pitch your ideas, find co-founders, and secure funding for your robotics venture.',
        slug: 'robotics-startup-meetup',
        organizerId: organizerUser._id,
        category: 'Meetup',
        startDate: new Date('2026-04-28T18:00:00Z'),
        endDate: new Date('2026-04-28T21:00:00Z'),
        timezone: 'America/New_York',
        location: {
          venue: 'TechHub NYC',
          address: '321 Park Avenue',
          city: 'New York',
          state: 'NY',
          zipCode: '10022',
          country: 'USA',
          coordinates: {
            latitude: 40.7128,
            longitude: -74.0060,
          },
        },
        capacity: 150,
        registeredCount: 142,
        totalRevenue: 0,
        status: 'published',
        visibility: 'public',
        tags: ['meetup', 'startup', 'networking', 'robotics'],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      },
    ]

    const createdEvents = await Event.insertMany(demoEvents)

    // Create tickets for each event
    const ticketsData = [
      // Symposium tickets
      {
        eventId: createdEvents[0]._id,
        name: 'Early Bird Pass',
        description: 'Get 30% off! Available until May 31st',
        type: 'paid',
        price: 149.99,
        currency: 'USD',
        quantity: 100,
        quantitySold: 89,
        saleStartDate: new Date('2026-04-01T00:00:00Z'),
        saleEndDate: new Date('2026-05-31T23:59:59Z'),
      },
      {
        eventId: createdEvents[0]._id,
        name: 'Regular Pass',
        description: 'Full access to all sessions and keynotes',
        type: 'paid',
        price: 199.99,
        currency: 'USD',
        quantity: 300,
        quantitySold: 145,
        saleStartDate: new Date('2026-04-01T00:00:00Z'),
        saleEndDate: new Date('2026-06-14T23:59:59Z'),
      },
      // Workshop tickets
      {
        eventId: createdEvents[1]._id,
        name: 'Full Workshop',
        description: '3-day intensive hands-on training',
        type: 'paid',
        price: 599.99,
        currency: 'USD',
        quantity: 100,
        quantitySold: 87,
        saleStartDate: new Date('2026-04-01T00:00:00Z'),
        saleEndDate: new Date('2026-05-19T23:59:59Z'),
      },
      // Championship tickets
      {
        eventId: createdEvents[2]._id,
        name: 'Spectator Pass - Day 1',
        description: 'Watch the qualifying rounds',
        type: 'paid',
        price: 49.99,
        currency: 'USD',
        quantity: 1000,
        quantitySold: 750,
        saleStartDate: new Date('2026-05-01T00:00:00Z'),
        saleEndDate: new Date('2026-07-09T23:59:59Z'),
      },
      {
        eventId: createdEvents[2]._id,
        name: 'Team Registration',
        description: 'Register your team for the competition',
        type: 'paid',
        price: 2999.99,
        currency: 'USD',
        quantity: 50,
        quantitySold: 38,
        saleStartDate: new Date('2026-05-01T00:00:00Z'),
        saleEndDate: new Date('2026-06-30T23:59:59Z'),
      },
      // Webinar tickets
      {
        eventId: createdEvents[3]._id,
        name: 'Free Attendance',
        description: 'Free webinar for all interested participants',
        type: 'free',
        price: 0,
        currency: 'USD',
        quantity: 5000,
        quantitySold: 3245,
        saleStartDate: new Date('2026-04-01T00:00:00Z'),
        saleEndDate: new Date('2026-05-04T23:59:59Z'),
      },
      // Meetup tickets
      {
        eventId: createdEvents[4]._id,
        name: 'Free Entry',
        description: 'Networking and light refreshments included',
        type: 'free',
        price: 0,
        currency: 'USD',
        quantity: 150,
        quantitySold: 142,
        saleStartDate: new Date('2026-03-01T00:00:00Z'),
        saleEndDate: new Date('2026-04-27T23:59:59Z'),
      },
    ]

    await Ticket.insertMany(ticketsData)

    return NextResponse.json(
      {
        success: true,
        message: 'Demo data created successfully',
        data: {
          admin: {
            email: adminUser.email,
            password: 'Admin123!',
            role: 'admin',
          },
          organizer: {
            email: organizerUser.email,
            password: 'Organizer123!',
            role: 'organizer',
          },
          events: createdEvents.length,
          tickets: ticketsData.length,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to seed demo data',
      },
      { status: 500 }
    )
  }
}
