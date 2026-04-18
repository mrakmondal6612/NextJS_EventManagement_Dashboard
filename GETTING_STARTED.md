# Getting Started with Event Management Dashboard

A comprehensive event management platform built with Next.js, MongoDB, and modern web technologies.

## Quick Start (5 minutes)

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **MongoDB** (local or Atlas account)
- **Git**

### Installation

1. **Navigate to project directory**

```bash
cd c:\Users\mrakm\Documents\Projects\event
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment**

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your settings:
# - MONGODB_URI: mongodb://localhost:27017/event-dashboard
# - JWT_SECRET: create-a-random-secret
# - NEXTAUTH_SECRET: create-another-random-secret
```

4. **Setup MongoDB**

**Local MongoDB:**

```bash
# Install MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Start MongoDB service
mongod
```

**Or use MongoDB Atlas (Cloud):**

- Create free account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string
- Add connection string to `.env.local`

5. **Run development server**

```bash
npm run dev
```

6. **Open in browser**

```
http://localhost:3000
```

## Default Test Credentials

Once setup, you can test with:

**Create new accounts:**

- Register page: http://localhost:3000/auth/register
- Create a test organizer account
- Create a test user account

## Features Overview

### 🎯 For Event Organizers

- Create and publish events
- Manage ticket types and pricing
- Track registrations in real-time
- View attendee information
- Manage event status and capacity

### 👥 For Attendees

- Browse published events with filters
- View detailed event information
- Register for events
- Select and purchase tickets
- View registration history
- Get event reminders

### 🎨 Full-Featured Dashboard

- Responsive design for all devices
- Real-time registration updates
- Event search and filtering
- Category-based browsing
- User-friendly interfaces

## Project Structure

```
event-management-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, register)
│   │   ├── (dashboard)/       # Dashboard routes (user, organizer)
│   │   ├── (public)/          # Public routes (events, home)
│   │   ├── api/               # API endpoints
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable React components
│   │   ├── auth/              # Login, Register forms
│   │   ├── events/            # Event components
│   │   ├── dashboard/         # Dashboard components
│   │   └── shared/            # Shared components
│   ├── lib/                   # Utility functions
│   │   ├── db.ts              # MongoDB connection
│   │   ├── jwt.ts             # JWT utilities
│   │   ├── password.ts        # Password hashing
│   │   ├── auth-context.tsx   # Auth state management
│   │   └── apiClient.ts       # API client
│   ├── models/                # Mongoose models
│   │   ├── User.ts
│   │   ├── Event.ts
│   │   ├── Ticket.ts
│   │   ├── Registration.ts
│   │   └── Notification.ts
│   ├── middleware/            # Custom middleware
│   │   ├── auth.ts            # Authentication
│   │   └── cors.ts            # CORS handling
│   └── styles/                # Global styles
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind CSS config
└── README.md                  # This file
```

## Key Endpoints

### Authentication

```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login user
```

### Events

```
GET    /api/events            List all events
GET    /api/events/:id        Get event details
POST   /api/events            Create new event
PUT    /api/events/:id        Update event
DELETE /api/events/:id        Delete event
```

### Tickets

```
GET    /api/events/:id/tickets        List event tickets
POST   /api/events/:id/tickets        Create new ticket
```

### Registrations

```
GET    /api/registrations              List user registrations
POST   /api/registrations              Register for event
```

## Using the Dashboard

### For First-Time Users

1. **Register an Account**
   - Go to http://localhost:3000/auth/register
   - Fill in your details
   - Click "Create account"

2. **Browse Events**
   - Visit http://localhost:3000/events
   - Use search and filters to find events
   - Click on event to view details

3. **Register for an Event**
   - Open event details
   - Select ticket type
   - Click "Register Now"
   - View registration in your dashboard

### For Event Organizers

1. **Create Organizer Account**
   - Register with role set to "organizer"
   - Or contact admin to upgrade account

2. **Create Your First Event**
   - Go to http://localhost:3000/dashboard/organizer
   - Click "Create Event"
   - Fill in event details:
     - Title and description
     - Date and time
     - Location
     - Capacity
   - Click "Create Event"

3. **Manage Event**
   - Add ticket types with pricing
   - View real-time registrations
   - Track attendance
   - Update event details

## Common Tasks

### View Registrations

```
Dashboard → Registrations → View details
```

### Update Event Details

```
Organizer Dashboard → Click event → Edit → Save
```

### Delete Event

```
Organizer Dashboard → Click event → Delete
```

### Register for Event

```
Browse Events → Click event → Select ticket → Register
```

## Environment Variables

Required variables in `.env.local`:

```
# Database
MONGODB_URI=mongodb://localhost:27017/event-dashboard
MONGODB_DB=event-dashboard

# Authentication
JWT_SECRET=your-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
FROM_EMAIL=noreply@eventdash.com
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# On Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
Stop-Process -Id <PID> -Force

# Or use a different port
npm run dev -- -p 3001
```

### MongoDB Connection Failed

1. Check if MongoDB is running
2. Verify MONGODB_URI in .env.local
3. Check network connectivity
4. Ensure database user has correct permissions

### Build Errors

```bash
# Clear cache and rebuild
npm run build

# Or full clean install
rm -r node_modules package-lock.json
npm install
npm run build
```

### Login Issues

1. Ensure user account exists
2. Check password is correct
3. Clear browser cache and cookies
4. Check JWT_SECRET is set correctly

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Run linter
npm run lint
```

## Next Steps

### 1. Customize Branding

- Edit colors in `tailwind.config.js`
- Update site title in `src/app/layout.tsx`
- Add your logo to `public/` folder

### 2. Add More Features

- Email notifications
- Payment processing (Stripe)
- Social sharing
- Advanced analytics
- Admin panel

### 3. Deploy

- Build for production: `npm run build`
- Deploy to Vercel, AWS, or your preferred platform
- Configure production environment variables

### 4. Scale Up

- Implement caching strategies
- Add database indexing
- Optimize images
- Implement rate limiting
- Add monitoring and logging

## Support & Resources

### Documentation

- [Full Development Guide](./DEVELOPMENT.md)
- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community

- Stack Overflow
- GitHub Discussions
- Dev.to community

## License

MIT License - Feel free to use for personal and commercial projects.

## Contributing

Found a bug or have a suggestion?

1. Create an issue in the repository
2. Submit a pull request with your changes
3. Follow the existing code style

---

**Happy event managing! 🎉**

For more help, check the [DEVELOPMENT.md](./DEVELOPMENT.md) file for detailed development guides.
