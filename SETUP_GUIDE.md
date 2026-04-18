# 🎉 AKEvent - Complete Setup & Usage Guide

## ✅ Status Check

Your AKEvent platform is now fully rebranded and professionally styled:

- ✨ Homepage redesigned with modern blue theme
- 🎯 Navigation updated with AKEvent branding
- 🔄 All colors changed from robotics theme to professional blue
- 📱 Fully responsive design
- 🚀 Ready for production use

---

## 🚀 Getting Started (3 Simple Steps)

### Step 1: Start the Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

### Step 2: Seed Demo Data

Open your browser or use a terminal to make a POST request:

**Option A: Using curl (Terminal)**

```bash
curl -X POST http://localhost:3000/api/seed
```

**Option B: Using browser (JavaScript Console)**

```javascript
fetch("http://localhost:3000/api/seed", { method: "POST" })
  .then((r) => r.json())
  .then((data) => console.log(data));
```

**Option C: Using Postman**

- Method: POST
- URL: `http://localhost:3000/api/seed`
- Click Send

### Step 3: Login & Explore

After seeding, you'll have admin accounts ready to use.

---

## 👤 Pre-Created User Accounts

After running the seed endpoint, these accounts are automatically created:

### Admin Account

```
Email:    admin@roboticsevent.com
Password: Admin123!
Access:   Full system access, view all users & events
```

### Organizer Account

```
Email:    organizer@roboticsevent.com
Password: Organizer123!
Access:   Create & manage events, view registrations
```

### Create Your Own User

You can also sign up normally:

- Go to http://localhost:3000/auth/register
- Fill in your details
- You'll be able to browse and register for events

---

## 🎯 What Can You Do?

### As an Admin

1. Login with admin account
2. Navigate to Admin Panel
3. View all users
4. View all events
5. Monitor system statistics
6. Manage platform settings

### As an Organizer

1. Login with organizer account
2. Go to Organizer section
3. Create new events
4. Add ticket types
5. View event registrations
6. Track attendance

### As a Regular User

1. Sign up or login
2. Browse all events
3. View event details
4. Select ticket type
5. Register for event
6. Track your registrations in dashboard

---

## 📊 Demo Data Included

After seeding, you'll have:

### 5 Pre-created Events

1. **International Robotics Symposium**
   - Capacity: 500
   - Registered: 234
   - Tickets: Premium ($199.99), Standard ($149.99)

2. **Advanced Robot Programming Workshop**
   - Capacity: 100
   - Registered: 87
   - Tickets: Workshop Pass ($599.99)

3. **MegaRobo Championship 2026**
   - Capacity: 2000
   - Registered: 1520
   - Tickets: Team ($2999.99), Spectator ($49.99)

4. **AI & Machine Learning Webinar**
   - Capacity: 5000
   - Registered: 3245
   - FREE admission

5. **Robotics Startup Meetup**
   - Capacity: 150
   - Registered: 142
   - FREE admission (food & drinks)

---

## 🔑 Environment Variables

Your `.env` file is already configured with:

```env
# Database
MONGODB_URI=<your-mongodb-atlas-connection>
MONGODB_DB=event-dashboard

# Authentication
JWT_SECRET=<generated-secure-key>
NEXTAUTH_SECRET=<generated-secure-key>
NEXTAUTH_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=your-email@gmail.com

# Razorpay Payments
RZP_KEY_ID=your_razorpay_key_id
RZP_KEY_SECRET=your_razorpay_secret_key
```

---

## 🔧 Troubleshooting

### Issue: Events page shows "No events"

**Solution:**

1. Make sure seed endpoint was called successfully
2. Check browser console for errors
3. Verify MongoDB connection in `.env`
4. Try calling seed endpoint again: `curl -X POST http://localhost:3000/api/seed`

### Issue: Login not working

**Solution:**

1. Check that seed endpoint was called
2. Verify email and password exactly match (case-sensitive)
3. Clear browser cookies and try again
4. Check that `NEXTAUTH_URL` is set to `http://localhost:3000`

### Issue: "Get Started" button not working

**Solution:**

1. Should redirect to registration page automatically
2. Check browser console for JavaScript errors
3. Try clearing cache: Ctrl+Shift+Delete (Chrome)

### Issue: Styles not loading

**Solution:**

1. Clear `.next` folder: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Clear browser cache: Ctrl+Shift+Delete

### Issue: MongoDB connection fails

**Solution:**

1. Verify `MONGODB_URI` in `.env` is correct
2. Check MongoDB Atlas IP whitelist includes your IP
3. Test connection string in terminal:
   ```bash
   mongodb+srv://username:password@cluster.mongodb.net/database
   ```

---

## 📋 Testing Checklist

- [ ] Seed endpoint called successfully
- [ ] Admin login works (admin@roboticsevent.com / Admin123!)
- [ ] Events page displays 5 demo events
- [ ] Can click on event to see details
- [ ] Organizer login works
- [ ] Can create new event as organizer
- [ ] User registration form works
- [ ] Can register for an event
- [ ] Dashboard shows registrations
- [ ] All styling is blue/professional (no robotics theme)
- [ ] Navigation bar displays "AKEvent" logo
- [ ] Get Started button redirects to signup

---

## 🚀 Next Steps

### To customize the platform:

1. **Change branding**
   - Update logo in Navigation.tsx
   - Change colors in globals.css
   - Update company info in footer

2. **Add your logo**
   - Replace `<span className="text-3xl font-bold text-blue-600">AK</span>` in Navigation.tsx
   - Add an image: `<Image src="/logo.png" alt="Logo" width={40} height={40} />`

3. **Customize colors**
   - Edit color scheme in globals.css
   - Search & replace `blue-600` with your brand color

4. **Add more events**
   - As organizer, go to create event section
   - Fill in event details
   - Add ticket types
   - Publish event

5. **Setup payments**
   - Get Razorpay credentials from dashboard
   - Add to `.env` file
   - Integrate in checkout component

---

## 💡 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint

# Check types
npm run type-check

# Seed demo data
curl -X POST http://localhost:3000/api/seed
```

---

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## 🆘 Need Help?

If something isn't working:

1. **Check the console**: Press F12 → Console tab → Look for red errors
2. **Check server logs**: Terminal where you ran `npm run dev`
3. **Verify setup**: Make sure all steps above were completed
4. **Database**: Make sure MongoDB is accessible
5. **API endpoint**: Test `/api/seed` is responding

---

## ✨ Features Overview

### Event Management

- ✅ Create, edit, delete events
- ✅ Add multiple ticket types
- ✅ Set capacity limits
- ✅ Track registrations in real-time

### User Features

- ✅ Sign up & login
- ✅ Browse events
- ✅ Register for events
- ✅ Track registrations
- ✅ User dashboard

### Admin Features

- ✅ View all users
- ✅ View all events
- ✅ System statistics
- ✅ User management

### Security

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ MongoDB database
- ✅ Environment variables for secrets

---

**You're all set! 🎉 Enjoy using AKEvent!**
