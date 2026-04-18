# 🤖 RoboticsHub - Admin & Demo Setup Guide

## Admin User Credentials

### Primary Admin Account

```
Email:    admin@roboticsevent.com
Password: Admin123!
Role:     Admin
```

### Organizer Account (for testing event management)

```
Email:    organizer@roboticsevent.com
Password: Organizer123!
Role:     Organizer
```

---

## 🚀 How to Seed Demo Data

The platform comes with a seed endpoint that creates:

- ✅ 1 Admin user account
- ✅ 1 Organizer user account
- ✅ 5 Robotics-themed demo events
- ✅ 7 Ticket types (free and paid)

### Step 1: Start the Development Server

```bash
npm run dev
```

Server will run on `http://localhost:3000`

### Step 2: Seed the Database

Make a POST request to the seed endpoint:

```bash
# Using curl
curl -X POST http://localhost:3000/api/seed

# Or using Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/seed" -Method POST

# Or using Postman
POST http://localhost:3000/api/seed
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Demo data created successfully",
  "data": {
    "admin": {
      "email": "admin@roboticsevent.com",
      "password": "Admin123!",
      "role": "admin"
    },
    "organizer": {
      "email": "organizer@roboticsevent.com",
      "password": "Organizer123!",
      "role": "organizer"
    },
    "events": 5,
    "tickets": 7
  }
}
```

### Step 3: Login with Admin Account

1. Open `http://localhost:3000/auth/login`
2. Enter credentials:
   - Email: `admin@roboticsevent.com`
   - Password: `Admin123!`
3. Click "Sign in"

---

## 📊 Demo Data Overview

### Demo Events Created

#### 1. **International Robotics Symposium 2026** 🏛️

- **Type:** Conference
- **Date:** June 15-17, 2026
- **Location:** San Francisco Convention Center
- **Capacity:** 500 | **Registered:** 234
- **Status:** Published
- **Tickets:**
  - Early Bird Pass - $149.99 (89/100 sold)
  - Regular Pass - $199.99 (145/300 sold)

#### 2. **Advanced Robot Programming Workshop** 💻

- **Type:** Workshop
- **Date:** May 20-22, 2026 (3-day intensive)
- **Location:** Mountain View Innovation Lab
- **Capacity:** 100 | **Registered:** 87
- **Status:** Published
- **Tickets:**
  - Full Workshop - $599.99 (87/100 sold)

#### 3. **MegaRobo Championship 2026** 🏆

- **Type:** Competition
- **Date:** July 10-12, 2026
- **Location:** Chicago Robotics Arena
- **Capacity:** 2000 | **Registered:** 1520
- **Status:** Published
- **Tickets:**
  - Spectator Pass (Day 1) - $49.99 (750/1000 sold)
  - Team Registration - $2999.99 (38/50 sold)

#### 4. **AI & Machine Learning in Robotics Webinar** 🌐

- **Type:** Webinar (Virtual)
- **Date:** May 5, 2026
- **Location:** Online - Zoom
- **Capacity:** 5000 | **Registered:** 3245
- **Status:** Published
- **Tickets:**
  - Free Attendance (3245/5000 registered)

#### 5. **Robotics Startup Meetup** 🤝

- **Type:** Meetup
- **Date:** April 28, 2026
- **Location:** TechHub NYC
- **Capacity:** 150 | **Registered:** 142
- **Status:** Published
- **Tickets:**
  - Free Entry (142/150 registered)

---

## 🎯 Testing the Platform

### Test as Admin

```
Email: admin@roboticsevent.com
Password: Admin123!
```

**Features Available:**

- View all users
- View all events
- View analytics
- System settings
- User management

### Test as Organizer

```
Email: organizer@roboticsevent.com
Password: Organizer123!
```

**Features Available:**

- Create new events
- Edit existing events
- Manage tickets
- View event registrations
- Event analytics

### Test as Regular User

1. Go to `http://localhost:3000/auth/register`
2. Create a new account with any details
3. Browse events
4. Register for events
5. View your registrations on dashboard

---

## 🎨 UI Enhancements Made

### Animations Added

- ✨ **Fade-in** - Smooth opacity transitions
- 🎯 **Slide-in** - Left and right slide animations
- 🌟 **Glow** - Pulsing gradient glow effect
- 🎈 **Float** - Floating animation for hero elements
- ⚡ **Pulse** - Heartbeat-like pulsing
- 🔄 **Rotate** - Continuous rotation animation
- ✨ **Shimmer** - Loading shimmer effect

### UI Improvements

- 🤖 **Robotics Theme** - Dark, tech-focused color scheme
- 🎨 **Gradient Design** - Modern gradient backgrounds
- 🎯 **Card Hover Effects** - Interactive card animations
- 📱 **Responsive Layout** - Mobile-first design
- 🌈 **Status Badges** - Color-coded status indicators
- 🎭 **Interactive Elements** - Hover transitions and effects

### Components Enhanced

- Navigation bar with animated dropdown menu
- Hero section with animated background shapes
- Feature cards with staggered animations
- Event cards with hover effects and loading states
- Button interactions with glow effects
- Statistics section with animated counters

---

## 📊 Dashboard Features

### User Dashboard

- View all registered events
- Track registration status
- View payment history
- Upcoming events countdown
- Statistics cards

### Organizer Dashboard

- Create new events
- Edit existing events
- View event registrations
- Track attendance
- Revenue analytics
- Quick event statistics

---

## 🔐 Security Notes

### Important

- ⚠️ **Change Default Passwords** in production!
- 🔒 **Use HTTPS** in production
- 🔑 **Secure SECRET variables** in `.env`
- 🚫 **Never commit** `.env.local` file
- 💳 **Enable rate limiting** for API
- 🔐 **Use strong JWT secrets**

### Best Practices

1. Change default credentials immediately
2. Use strong, unique passwords
3. Enable two-factor authentication (future)
4. Regular security audits
5. Keep dependencies updated

---

## 🐛 Troubleshooting

### Seed endpoint returns 500 error

**Solution:**

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Clear existing data first

### Duplicate key error

**Solution:**

- Database already has demo data
- Clear collections first: `db.users.deleteMany({})`
- Or use a fresh database

### Login fails after seeding

**Solution:**

- Clear browser cookies
- Check email spelling exactly
- Ensure password is exact
- Check user role is correct

### Events not showing

**Solution:**

- Verify events were created (check MongoDB)
- Ensure events have status: "published"
- Check current date vs event dates
- Verify location data exists

---

## 📝 API Usage Examples

### Login with Admin

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@roboticsevent.com",
    "password": "Admin123!"
  }'
```

### Get All Events

```bash
curl -X GET "http://localhost:3000/api/events?page=1&limit=10"
```

### Get Event Details

```bash
curl -X GET http://localhost:3000/api/events/[EVENT_ID]
```

### List Registrations

```bash
curl -X GET http://localhost:3000/api/registrations \
  -H "Authorization: Bearer [TOKEN]"
```

---

## 🚀 Next Steps

### Immediate

1. ✅ Run `npm run dev`
2. ✅ Call seed endpoint
3. ✅ Login with admin credentials
4. ✅ Explore the platform

### Short-term

1. Customize company branding
2. Update email templates
3. Test payment integration
4. Set up email notifications

### Long-term

1. Deploy to production
2. Configure production database
3. Set up monitoring
4. Implement backups

---

## 📞 Support

### Documentation

- See `GETTING_STARTED.md` for quick start
- See `API_DOCUMENTATION.md` for API details
- See `DEVELOPMENT.md` for development guide
- See `PROJECT_STRUCTURE.md` for code structure

### Common Tasks

- **Create event:** Organizer Dashboard → Create Event
- **View registrations:** Event Details → Registrations
- **Edit event:** Organizer Dashboard → Click Event → Edit
- **Cancel registration:** User Dashboard → Registration → Cancel

---

## ✨ Features Demo

### For Attendees

- ✅ Browse 5 robotics events
- ✅ View detailed event information
- ✅ Register for events
- ✅ Select ticket types
- ✅ Track registrations

### For Organizers

- ✅ Create events with full details
- ✅ Add multiple ticket types
- ✅ View live registrations
- ✅ Track ticket sales
- ✅ Manage attendees

### For Admins

- ✅ View all events
- ✅ View all users
- ✅ View analytics
- ✅ System management

---

## 🎉 You're All Set!

Your RoboticsHub Event Management Platform is ready with:

- ✅ Complete admin setup
- ✅ Demo data loaded
- ✅ Animations & UI enhancements
- ✅ User accounts configured

**Start exploring:** `http://localhost:3000`

**Happy event managing!** 🚀
