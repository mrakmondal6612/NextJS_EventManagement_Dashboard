# Event Management Dashboard - Development Guide

This document provides detailed guidance for developing and extending the Event Management Dashboard.

## Architecture Overview

### Frontend (Next.js 14)

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API (Auth)
- **API Communication**: Axios with custom `ApiClient`
- **Routing**: Next.js App Router with route groups

### Backend (API Routes)

- **Runtime**: Node.js via Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Validation**: Built-in request validation

### Database

- **MongoDB** for data persistence
- **Mongoose** for schema definition and validation
- **Collections**: Users, Events, Tickets, Registrations, Notifications

## Key Features Implementation

### 1. Authentication System

- User registration and login
- JWT token generation and validation
- Role-based access control (user, organizer, admin)
- Protected API routes with middleware

**Location**: `/src/lib/jwt.ts`, `/src/middleware/auth.ts`, `/src/app/api/auth/`

### 2. Event Management

- Create, read, update, delete events
- Event categorization and filtering
- Capacity management
- Event status tracking (draft, published, cancelled, completed)

**Location**: `/src/models/Event.ts`, `/src/app/api/events/`

### 3. Registration System

- User registration for events
- Ticket selection during registration
- Registration status tracking
- Duplicate registration prevention

**Location**: `/src/models/Registration.ts`, `/src/app/api/registrations/`

### 4. Ticket Management

- Multiple ticket types per event
- Price and quantity management
- Ticket availability tracking
- Currency support

**Location**: `/src/models/Ticket.ts`, `/src/app/api/events/[eventId]/tickets/`

### 5. User Dashboards

- **Attendee Dashboard**: View registrations, upcoming events
- **Organizer Dashboard**: Create and manage events, view registrations

**Location**: `/src/app/(dashboard)/dashboard/`

## Development Workflow

### Setup Environment

1. **Clone and Install**

```bash
cd event-management-dashboard
npm install
```

2. **Configure Environment**

```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

3. **MongoDB Setup**

- Local: `npm install -g mongod` and run MongoDB
- Cloud: Use MongoDB Atlas connection string

4. **Run Development Server**

```bash
npm run dev
# Server runs on http://localhost:3000
```

### Database Models

#### User Model

```typescript
{
  email: string (unique)
  password: string (hashed)
  firstName: string
  lastName: string
  role: 'user' | 'organizer' | 'admin'
  phone?: string
  avatar?: string
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
}
```

#### Event Model

```typescript
{
  title: string
  description: string
  slug: string (unique)
  organizerId: ObjectId (ref: User)
  image?: string
  location: {
    venue: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    coordinates?: { latitude, longitude }
  }
  startDate: Date
  endDate: Date
  timezone: string
  category: string
  visibility: 'public' | 'private'
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  capacity: number
  registeredCount: number
  totalRevenue: number
  tags: string[]
}
```

#### Ticket Model

```typescript
{
  eventId: ObjectId (ref: Event)
  name: string
  description?: string
  type: 'free' | 'paid'
  price: number
  quantity: number
  quantitySold: number
  currency: string
  saleStartDate: Date
  saleEndDate: Date
}
```

#### Registration Model

```typescript
{
  eventId: ObjectId (ref: Event)
  userId: ObjectId (ref: User)
  ticketId: ObjectId (ref: Ticket)
  email: string
  firstName: string
  lastName: string
  phone?: string
  customFields?: Record<string, any>
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked-in'
  paidAmount: number
  paymentId?: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
}
```

#### Notification Model

```typescript
{
  recipientId: ObjectId (ref: User)
  type: 'event_created' | 'registration_confirmed' | 'event_reminder' | 'event_cancelled' | 'payment'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  relatedEventId?: ObjectId
  relatedRegistrationId?: ObjectId
}
```

## Common Tasks

### Adding a New API Endpoint

1. **Create Route Handler** in `/src/app/api/`

```typescript
export async function POST(req: NextRequest) {
  await connectDB()
  // Implementation
  return NextResponse.json(...)
}
```

2. **Update API Client** in `/src/lib/apiClient.ts`

3. **Create Frontend Component** if needed

### Adding a New Page/Feature

1. **Create API routes** in `/src/app/api/`
2. **Create models** if new data needed
3. **Create React components** in `/src/components/`
4. **Create page** in appropriate `/src/app/` route group
5. **Update navigation** if needed

### Protecting Routes

```typescript
// API Route
import { withAuth } from "@/middleware/auth";

export const POST = withAuth(async (req, res) => {
  // req.user is now available
});

// Frontend Component
import { useAuth } from "@/lib/auth-context";

const { isAuthenticated, user } = useAuth();
if (!isAuthenticated) {
  router.push("/auth/login");
}
```

## API Reference

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events Endpoints

- `GET /api/events` - List events (paginated)
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Tickets Endpoints

- `GET /api/events/:eventId/tickets` - List event tickets
- `POST /api/events/:eventId/tickets` - Create ticket

### Registrations Endpoints

- `GET /api/registrations` - List registrations
- `POST /api/registrations` - Create registration

## Extending the Platform

### Adding Payment Integration

1. Install Stripe SDK: `npm install @stripe/react-stripe-js`
2. Create payment API route
3. Add payment callback handler
4. Update registration model with payment fields

### Adding Email Notifications

1. Install mailing library: `npm install nodemailer`
2. Create email service in `/src/services/`
3. Trigger emails on event lifecycle events
4. Configure SMTP in `.env`

### Adding Real-time Features

1. Install Socket.io: Already in dependencies
2. Create Socket.io server
3. Emit events on registration, event creation, etc.
4. Update components to listen for real-time updates

### Adding Admin Features

1. Create admin routes under `/src/app/(admin)/`
2. Implement admin-only API endpoints
3. Add admin role permission checks
4. Create admin dashboard

## Testing

### API Testing

```bash
# Install REST client or use curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### Component Testing

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm test
```

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

- `MONGODB_URI`: Connection string
- `JWT_SECRET`: Secure random string
- `NEXTAUTH_SECRET`: Secure random string
- `NEXT_PUBLIC_API_URL`: API URL

### Deployment Platforms

- Vercel (recommended for Next.js)
- AWS/EC2
- Digital Ocean
- Heroku (with paid plans)

## Troubleshooting

### MongoDB Connection Issues

- Check `MONGODB_URI` in `.env.local`
- Verify MongoDB service is running
- Check network access if using Atlas

### Authentication Issues

- Verify JWT_SECRET is set
- Check token expiration
- Clear browser localStorage if needed

### CORS Issues

- Check CORS middleware in API routes
- Verify API_URL configuration

## Performance Optimization

- Implement image optimization with Next.js Image component
- Add database indexes for frequently queried fields
- Implement caching strategies
- Code splitting for components
- Lazy loading for routes

## Security Considerations

- Never commit `.env.local` file
- Validate all user inputs server-side
- Implement rate limiting on API endpoints
- Use HTTPS in production
- Implement CSRF protection
- Regular dependency updates

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
