# 🔐 AKEvent - Auth Pages Testing & Troubleshooting

## ✅ Demo Data Status

**Successfully seeded:**

- ✅ 5 demo events (Symposium, Workshop, Championship, Webinar, Meetup)
- ✅ 7 ticket types (varying prices)
- ✅ Admin account created
- ✅ Organizer account created

---

## 👤 Pre-Created Accounts (After Seeding)

### Admin Account (Full System Access)

```
Email:    admin@roboticsevent.com
Password: Admin123!
Role:     Admin (view all users, events, analytics)
```

### Organizer Account (Create & Manage Events)

```
Email:    organizer@roboticsevent.com
Password: Organizer123!
Role:     Organizer (create events, manage tickets, view registrations)
```

---

## 🔄 How to Login

### Step 1: Go to Login Page

```
URL: http://localhost:3000/auth/login
```

### Step 2: Use One of These Credentials

**Option A - Admin Account:**

- Email: `admin@roboticsevent.com`
- Password: `Admin123!`

**Option B - Organizer Account:**

- Email: `organizer@roboticsevent.com`
- Password: `Organizer123!`

### Step 3: Click Login

- You'll be redirected to dashboard
- See "Welcome Back!" message
- Check user profile in top-right dropdown

---

## 📝 How to Register (Create New Account)

### Step 1: Go to Register Page

```
URL: http://localhost:3000/auth/register
```

### Step 2: Fill in Details

```
First Name:  John
Last Name:   Doe
Email:       john.doe@example.com
Password:    MyPassword123!
Confirm:     MyPassword123!
```

### Step 3: Click "Create Account"

- Account is created instantly
- Logged in automatically
- Redirected to dashboard

---

## 🐛 Troubleshooting Auth Issues

### Issue: Login Page Shows but Button Does Nothing

**Solution 1: Clear Cache & Reload**

- Press: `Ctrl + Shift + Delete`
- Select "All time"
- Click "Clear data"
- Refresh page: `Ctrl + R`

**Solution 2: Check Browser Console**

- Press: `F12` (or `Cmd+Option+I` on Mac)
- Click "Console" tab
- Look for red error messages
- Copy error and check below

**Solution 3: Verify Server is Running**

```bash
# Check if you see "Ready in X.Xs" message
# If not, run:
npm run dev
```

### Issue: "Invalid credentials" Error

**Solution:**

- ✅ Make sure seed was successful (check output above)
- ✅ Type email exactly: `admin@roboticsevent.com`
- ✅ Type password exactly: `Admin123!` (capital A!)
- ✅ No extra spaces before/after
- ✅ Password is case-sensitive

### Issue: "User not found" Error

**Solution:**

1. Make sure you called seed endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
2. You should see: `"success":true`
3. Try login with the exact credentials from seed output

### Issue: "MongoDB connection error" in Console

**Solution:**

1. Check `.env` file has correct `MONGODB_URI`
2. Verify MongoDB Atlas connection string
3. Make sure IP is whitelisted in MongoDB Atlas
4. Test connection: `mongo "your-connection-string"`

### Issue: Form Won't Submit or Page Freezes

**Solution:**

1. Check internet connection
2. Try a different browser
3. Clear browser data: `Ctrl + Shift + Delete`
4. Open DevTools (F12) → Network tab
5. Try login again
6. Look for failed requests (red entries)

---

## ✨ Testing Checklist

**Login Testing:**

- [ ] Can reach http://localhost:3000/auth/login
- [ ] Form has email & password fields
- [ ] Can type in fields
- [ ] Click Login button
- [ ] See loading spinner
- [ ] Redirected to dashboard
- [ ] See user name in top-right
- [ ] Can see dropdown menu

**Registration Testing:**

- [ ] Can reach http://localhost:3000/auth/register
- [ ] Form has all fields
- [ ] Can type in fields
- [ ] Passwords don't match shows error
- [ ] Can successfully register
- [ ] Logged in automatically
- [ ] Redirected to dashboard
- [ ] See new user's name

**Events Testing (After Login):**

- [ ] Can navigate to /events
- [ ] See 5 demo events listed
- [ ] Can click on event card
- [ ] See event details
- [ ] Can select ticket type
- [ ] Can register for event

---

## 🚀 Expected Behavior

### After Successful Login

```
URL changes to: http://localhost:3000/dashboard
You see: "Welcome back, [Your Name]!"
Navigation shows your profile name
Logout button available
```

### After Successful Registration

```
Account created instantly
Auto-logged in
Redirected to dashboard
Can see "Welcome, [Your Name]!"
```

---

## 📞 Debug Commands

If you encounter issues, run these in terminal:

**Check MongoDB connection:**

```bash
# See if connection is working
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ Connected to MongoDB');
  process.exit(0);
}).catch(e => {
  console.log('❌ Connection failed:', e.message);
  process.exit(1);
});
"
```

**Check API response:**

```bash
# Test login API directly
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@roboticsevent.com",
    "password": "Admin123!"
  }'
```

**Test seed again:**

```bash
curl -X POST http://localhost:3000/api/seed
```

---

## 🔍 Browser Console Debugging

1. Press `F12` to open DevTools
2. Go to "Console" tab
3. Run this to test login API:

```javascript
fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@roboticsevent.com",
    password: "Admin123!",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log(data));
```

You should see:

```json
{
  "success": true,
  "message": "Login successful",
  "data": { "user": {...}, "token": "..." }
}
```

---

## 📊 Working Demo Events

After seeding, you'll have these 5 events to test with:

| Event                            | Type        | Capacity | Registered | Ticket Price    |
| -------------------------------- | ----------- | -------- | ---------- | --------------- |
| International Robotics Symposium | Conference  | 500      | 234        | $149.99-$199.99 |
| Advanced Programming Workshop    | Workshop    | 100      | 87         | $599.99         |
| MegaRobo Championship            | Competition | 2000     | 1520       | $49.99-$2999.99 |
| AI & ML Webinar                  | Webinar     | 5000     | 3245       | FREE            |
| Robotics Startup Meetup          | Meetup      | 150      | 142        | FREE            |

---

## ✅ Step-by-Step: Complete Test Flow

### 1. Start Server

```bash
npm run dev
```

✓ See "Ready in X.Xs"

### 2. Seed Data

```bash
curl -X POST http://localhost:3000/api/seed
```

✓ See `"success":true`

### 3. Test Login

- Go to: http://localhost:3000/auth/login
- Email: `admin@roboticsevent.com`
- Password: `Admin123!`
- Click "Login"
  ✓ Should see dashboard

### 4. Test Events

- Click "Events" in navigation
- See 5 demo events
- Click on any event
- See details & tickets
  ✓ Can register if not logged in as organizer

### 5. Test Registration

- Logout (click dropdown → Logout)
- Go to: http://localhost:3000/auth/register
- Fill in new user details
- Click "Create Account"
  ✓ Should be logged in to dashboard

### 6. Test Organizer

- Logout
- Login with organizer@roboticsevent.com / Organizer123!
- Click "Organizer" in navigation
- Should see event management area
  ✓ Can create new events

---

## 🆘 Still Not Working?

If auth pages still don't work after trying above steps:

1. **Close and restart everything:**

   ```bash
   # Stop server (Ctrl+C)
   # Clear cache:
   rm -rf .next
   # Restart:
   npm run dev
   ```

2. **Check logs in terminal** where you ran `npm run dev`
   - Look for error messages
   - Share the error message

3. **Check MongoDB connection:**
   - Verify `.env` has correct `MONGODB_URI`
   - Test connection in MongoDB Atlas dashboard

4. **Verify seed worked:**
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
   Should return `"success":true`

---

**You're all set! Login and enjoy AKEvent! 🎉**
