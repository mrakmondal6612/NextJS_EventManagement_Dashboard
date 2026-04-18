# Project Structure Overview

## Complete Directory Tree

```
event-management-dashboard/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── next.config.js            # Next.js configuration
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── postcss.config.js         # PostCSS config
│   └── .env.example              # Environment variables template
│
├── 📚 Documentation
│   ├── README.md                 # Project overview
│   ├── GETTING_STARTED.md        # Quick start guide
│   └── DEVELOPMENT.md            # Detailed development guide
│
├── 📁 public/                    # Static assets
│   └── (images, icons, fonts)
│
├── 📁 src/
│   │
│   ├── 📁 app/                   # Next.js App Router (NEW in Next.js 13+)
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout with AuthProvider
│   │   │
│   │   ├── 📁 (auth)/            # Authentication routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── 📁 (public)/          # Public routes group
│   │   │   └── events/
│   │   │       ├── page.tsx      # Events listing page
│   │   │       └── [id]/
│   │   │           └── page.tsx  # Event details page
│   │   │
│   │   ├── 📁 (dashboard)/       # Protected routes group
│   │   │   └── dashboard/
│   │   │       ├── page.tsx      # User dashboard
│   │   │       └── organizer/
│   │   │           └── page.tsx  # Organizer dashboard
│   │   │
│   │   └── 📁 api/               # Backend API routes
│   │       ├── 📁 auth/
│   │       │   ├── register/
│   │       │   │   └── route.ts
│   │       │   └── login/
│   │       │       └── route.ts
│   │       │
│   │       ├── 📁 events/
│   │       │   ├── route.ts      # GET /api/events, POST /api/events
│   │       │   ├── [id]/
│   │       │   │   ├── route.ts  # GET/PUT/DELETE /api/events/:id
│   │       │   │   └── tickets/
│   │       │   │       └── route.ts
│   │       │   └── [eventId]/
│   │       │       └── tickets/
│   │       │           └── route.ts
│   │       │
│   │       └── 📁 registrations/
│   │           └── route.ts      # GET, POST registrations
│   │
│   ├── 📁 components/            # Reusable React components
│   │   ├── 📁 auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   │
│   │   ├── 📁 events/
│   │   │   └── EventList.tsx
│   │   │
│   │   ├── 📁 dashboard/
│   │   │   └── (dashboard components)
│   │   │
│   │   └── 📁 shared/
│   │       └── Navigation.tsx
│   │
│   ├── 📁 lib/                   # Utility functions & helpers
│   │   ├── db.ts                 # MongoDB connection
│   │   ├── jwt.ts                # JWT token utilities
│   │   ├── password.ts           # Password hashing
│   │   ├── api.ts                # API response helpers
│   │   ├── apiClient.ts          # Axios API client
│   │   ├── utils.ts              # Format utilities
│   │   └── auth-context.tsx      # Auth state management
│   │
│   ├── 📁 models/                # Mongoose database models
│   │   ├── User.ts               # User schema & validation
│   │   ├── Event.ts              # Event schema & validation
│   │   ├── Ticket.ts             # Ticket schema & validation
│   │   ├── Registration.ts       # Registration schema & validation
│   │   └── Notification.ts       # Notification schema & validation
│   │
│   ├── 📁 middleware/            # Express-like middleware
│   │   ├── auth.ts               # Authentication middleware
│   │   └── cors.ts               # CORS middleware
│   │
│   ├── 📁 services/              # Business logic services
│   │   └── (email, payment, notifications)
│   │
│   ├── 📁 types/                 # TypeScript types & interfaces
│   │   └── (custom type definitions)
│   │
│   └── 📁 styles/                # Global styles
│       └── globals.css           # Tailwind CSS imports
│
└── 📄 Root Files
    ├── .gitignore
    └── package-lock.json (after npm install)
```

## File Purposes

### Core Configuration

- **package.json**: Defines dependencies, scripts, and project metadata
- **tsconfig.json**: TypeScript compiler options and path mappings
- **next.config.js**: Next.js build and runtime configuration
- **tailwind.config.js**: Tailwind CSS customization
- **.env.example**: Template for environment variables

### Database Layer

- **src/lib/db.ts**: MongoDB connection with caching
- **src/models/\*.ts**: Mongoose schemas with validation
- All models have proper indexing and relationships

### API Layer (Next.js Routes)

- **src/app/api/auth/**: Authentication endpoints
- **src/app/api/events/**: Event CRUD operations
- **src/app/api/registrations/**: Registration management
- All routes handle errors gracefully

### Frontend Layer

- **src/app/**: Page components using Next.js App Router
- **src/components/**: Reusable UI components
- **src/lib/auth-context.tsx**: Global auth state management

### Utilities & Services

- **src/lib/jwt.ts**: Token generation and verification
- **src/lib/password.ts**: Password hashing with bcrypt
- **src/lib/apiClient.ts**: Centralized API communication
- **src/middleware/auth.ts**: Route protection
- **src/middleware/cors.ts**: Cross-origin resource sharing

## Data Flow

### Authentication Flow

```
User Input
    ↓
Form Component (LoginForm/RegisterForm)
    ↓
api/auth/login or api/auth/register
    ↓
JWT Token Generated
    ↓
Token Stored in localStorage
    ↓
AuthContext Updated
    ↓
User Redirected to Dashboard
```

### Event Creation Flow

```
Organizer Form Input
    ↓
POST /api/events
    ↓
Validate Request
    ↓
Save to MongoDB
    ↓
Return Created Event
    ↓
Update Dashboard
    ↓
Show Success Message
```

### Event Registration Flow

```
User Selects Event
    ↓
View Event Details
    ↓
Select Ticket Type
    ↓
POST /api/registrations
    ↓
Check Availability
    ↓
Create Registration
    ↓
Update Event Count
    ↓
Show Confirmation
    ↓
Add to User Dashboard
```

## Key Technologies Used

### Frontend

- **React 18**: UI library with hooks
- **Next.js 14**: React framework with routing
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **SWR/Axios**: Data fetching

### Backend

- **Node.js**: JavaScript runtime
- **Next.js API Routes**: Serverless functions
- **Express** (implicit): Via Next.js

### Database

- **MongoDB**: NoSQL document database
- **Mongoose**: ODM for MongoDB

### Authentication

- **JWT**: JSON Web Tokens
- **bcryptjs**: Password hashing
- **React Context**: State management

### Styling

- **Tailwind CSS**: Utility classes
- **PostCSS**: CSS processing

## Environment Variables Explained

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/event-dashboard
MONGODB_DB=event-dashboard

# Auth Secrets (Generate random strings)
JWT_SECRET=your-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
FROM_EMAIL=noreply@eventdash.com

# Stripe Integration (Optional)
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

## Development Workflow

### Adding a New Page

1. Create folder in appropriate route group
2. Create `page.tsx` file
3. Add route to Navigation if needed
4. Create components as needed

### Adding a New API Endpoint

1. Create route file following Next.js conventions
2. Define route handlers (GET, POST, etc.)
3. Add to apiClient.ts
4. Use in components

### Adding a New Database Model

1. Create model file in src/models/
2. Define schema and interfaces
3. Create/update API endpoint
4. Add database connection to endpoint
5. Test with API calls

### Styling Components

1. Use Tailwind utility classes
2. No CSS files needed for most cases
3. Custom styles go in globals.css
4. Responsive design: use sm:, md:, lg: breakpoints

## Best Practices

### Code Organization

✅ Keep components in appropriate folders
✅ Use TypeScript for type safety
✅ Follow Next.js conventions
✅ One component per file
✅ Separate logic from presentation

### Security

✅ Never commit .env.local
✅ Validate inputs server-side
✅ Hash passwords with bcrypt
✅ Use JWT with secure secrets
✅ Implement rate limiting
✅ Sanitize database queries

### Performance

✅ Use Next.js Image component
✅ Implement database indexes
✅ Code splitting with dynamic imports
✅ Caching strategies
✅ Optimize bundle size

### Scalability

✅ Modular component design
✅ Reusable hooks and utilities
✅ Service layer for business logic
✅ Proper error handling
✅ Logging and monitoring
