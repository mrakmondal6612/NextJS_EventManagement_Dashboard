# Event Management Dashboard

A comprehensive event management platform inspired by Hi.Events, Eventbrite, Tickettailor, and Dice.fm.

## Features

### For Event Organizers

- 🎯 Create and manage events
- 📊 Real-time registration tracking
- 🎟️ Ticket management and customization
- 📧 Email notifications and communications
- 📈 Analytics and reporting
- 💳 Payment processing
- 👥 Attendee management

### For Users

- 🔍 Browse and search events
- 🎫 Register for events
- 💳 Secure payment processing
- 📱 Responsive dashboard
- 🔔 Event reminders and notifications
- 💙 Save favorite events
- 📧 Order history and receipts

### Platform Features

- 🔐 Secure authentication (JWT)
- 📱 Fully responsive design
- 🚀 Real-time updates with WebSockets
- 🔔 Notification system
- 📊 Advanced analytics
- 🎨 Modern UI with Tailwind CSS
- ⚡ High-performance with Next.js

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js & JWT
- **Real-time**: Socket.io
- **Validation**: Zod, class-validator
- **UI Components**: Lucide React, React Icons

## Project Structure

```
event-management-dashboard/
├── src/
│   ├── app/                      # App router (Next.js 14+)
│   │   ├── (auth)/              # Authentication routes
│   │   ├── (dashboard)/         # Dashboard routes
│   │   ├── (public)/            # Public routes
│   │   └── api/                 # API routes
│   ├── components/              # React components
│   │   ├── auth/
│   │   ├── events/
│   │   ├── dashboard/
│   │   └── shared/
│   ├── models/                  # Mongoose models
│   ├── middleware/              # Custom middleware
│   ├── services/                # Business logic
│   ├── lib/                     # Utilities
│   ├── types/                   # TypeScript types
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── .env.example
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or cloud Atlas)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd event-management-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

### MongoDB Connection

```javascript
// Uses MONGODB_URI from .env.local
mongodb://[username:password@]host:port/database
```

### Models

- User
- Event
- Ticket
- Registration
- Payment
- Notification

## API Routes

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Events

- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (organizer)
- `PATCH /api/events/:id` - Update event (organizer)
- `DELETE /api/events/:id` - Delete event (organizer)

### Registrations

- `GET /api/registrations` - List user registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/:id` - Get registration details
- `DELETE /api/registrations/:id` - Cancel registration

### Tickets

- `GET /api/events/:id/tickets` - Get event tickets
- `POST /api/events/:id/tickets` - Create ticket type

## Features Implementation Roadmap

- [x] Project structure setup
- [x] Database models
- [ ] Authentication system
- [ ] Event CRUD operations
- [ ] Real-time registration updates
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] API documentation

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@eventdash.com or create an issue on GitHub.
