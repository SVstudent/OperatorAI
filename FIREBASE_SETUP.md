# Firebase Setup Guide for OperatorAI

## Your Firebase Project
**Project Name:** operator911-1acc3
**Owner:** Sathvik Vempati

## Current Configuration Status
✅ Firebase config already added to the code
✅ Frontend configured: `frontend/src/firebaseConfig.ts`
✅ Backend configured: `backend/src/firebase.js`

## What You Need to Do

### 1. Enable Realtime Database

Your Firebase project is set up, but you need to enable the **Realtime Database** feature:

1. Go to: https://console.firebase.google.com/project/operator911-1acc3/database
2. Click **"Create Database"** under Realtime Database section
3. **Choose location:** Select `United States (us-central1)` or closest to you
4. **Security rules:** Select **"Start in test mode"** (we'll configure this next)
5. Click **"Enable"**

### 2. Get Your Database URL

After creating the database:
- Look at the top of the Realtime Database page
- You'll see a URL like: `https://operator911-1acc3-default-rtdb.firebaseio.com`
- **This URL is already in your code!** But verify it matches.

If the URL is different (different region), update it in:
- Line 10 in [backend/src/firebase.js](backend/src/firebase.js)
- Line 9 in [frontend/src/firebaseConfig.ts](frontend/src/firebaseConfig.ts)

### 3. Configure Security Rules (For Development)

In Firebase Console > Realtime Database > Rules tab:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Click **"Publish"** to apply the rules.

⚠️ **WARNING:** These rules allow anyone to read/write your database. This is OK for development/testing, but you'll need proper security rules for production!

### 4. Database Structure

The app will automatically create this structure when calls come in:

```
operator911-1acc3
└── calls/
    └── [callSid]/
        ├── callSid: string
        ├── dateCreated: ISO timestamp
        ├── dateDisconnected: ISO timestamp (when call ends)
        ├── emergency: string (type of emergency)
        ├── geocode: {lat: number, lng: number}
        ├── live: boolean
        ├── location: string (address/location name)
        ├── name: string (caller name)
        ├── phone: string (phone number)
        ├── priority: "HIGH" | "MEDIUM" | "LOW" | "TBD"
        ├── status: "OPEN" | "DISPATCHED" | "RESOLVED"
        ├── streamSid: string
        └── transcript: string (real-time call transcript)
```

## Production Security Rules (For Later)

When you're ready to deploy, use these more secure rules:

```json
{
  "rules": {
    "calls": {
      "$callSid": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

This requires authentication. You'll need to:
1. Enable Firebase Authentication
2. Add login functionality to your app
3. Update the rules based on your needs

## Firebase Pricing

- **Spark Plan (Free):**
  - 1GB storage
  - 10GB/month download
  - 100 simultaneous connections
  - **This should be enough for development and testing!**

- **Blaze Plan (Pay as you go):**
  - Only needed if you exceed free tier limits
  - You set spending limits to avoid surprises

## Troubleshooting

### "Permission denied" errors
- Check that you've published the security rules
- Verify you're using test mode rules (shown in step 3)

### Database URL doesn't work
- Make sure you created a Realtime Database (not Firestore!)
- Verify the URL format: `https://[project-id]-default-rtdb.firebaseio.com`
- The region suffix might be different (e.g., `-europe-west1` or `-asia-southeast1`)

### Data not showing up
- Check Firebase Console > Realtime Database to see if data is being written
- Look at browser console for errors
- Verify both frontend and backend are using the same database URL

## Verification Steps

To verify everything is working:

1. ✅ Firebase project created: `operator911-1acc3`
2. ⬜ Realtime Database enabled
3. ⬜ Security rules published (test mode)
4. ⬜ Database URL verified in code
5. ⬜ Run frontend: `npm run dev` (should load without errors)
6. ⬜ Check browser console for Firebase connection errors

## Quick Links

- Firebase Console: https://console.firebase.google.com/project/operator911-1acc3
- Realtime Database: https://console.firebase.google.com/project/operator911-1acc3/database
- Project Settings: https://console.firebase.google.com/project/operator911-1acc3/settings/general

---

**Questions?** Check the main [SETUP.md](SETUP.md) or Firebase docs at https://firebase.google.com/docs/database
