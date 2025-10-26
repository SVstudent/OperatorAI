# OperatorAI Setup Guide

**Project Owner: Sathvik Vempati**

## Overview
OperatorAI is an AI-powered emergency call triage system that helps 911 operators manage high call volumes by using AI transcription, classification, and prioritization.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- API Keys for:
  - AssemblyAI (for real-time transcription)
  - Google Maps API (for location services)
  - HuggingFace (for AI analysis)
  - Firebase (for real-time database)
  - Twilio (for phone call handling)

## Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd OperatorAI
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
ASSEMBLYAI_API_KEY=your_assemblyai_key
MAPS_API_KEY=your_google_maps_key
HUGGINGFACE_API_KEY=your_huggingface_key
HUGGINGFACE_API_KEY2=your_second_huggingface_key
```

#### Configure Firebase
Firebase configuration is already set up in `backend/src/firebase.js` with your project credentials.

**Important: You need to get your Realtime Database URL**

1. Go to https://console.firebase.google.com/
2. Select your project: `operator911-1acc3`
3. Click on "Realtime Database" in the left sidebar
4. If you haven't created a database yet, click "Create Database"
   - Choose a location (us-central1 is recommended)
   - Start in **test mode** for development (you can secure it later)
5. Once created, you'll see the database URL at the top (e.g., `https://operator911-1acc3-default-rtdb.firebaseio.com`)
6. If the URL in the code doesn't match, update it in both:
   - `backend/src/firebase.js` (line 10)
   - `frontend/src/firebaseConfig.ts` (line 9)

**Set up Firebase Security Rules (Important!)**
In the Firebase Console > Realtime Database > Rules tab, use these rules for testing:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
⚠️ **Note:** These rules allow anyone to read/write. For production, implement proper security rules!

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Firebase Configuration
Firebase is already configured in `frontend/src/firebaseConfig.ts` with your project credentials.
Just verify the `databaseURL` matches what you see in the Firebase Console (see Backend Setup > Configure Firebase above).

### 4. API Keys Setup

#### AssemblyAI
1. Sign up at https://www.assemblyai.com/
2. Get your API key from the dashboard
3. Add to backend `.env` file

#### Google Maps API
1. Go to https://console.cloud.google.com/
2. Enable Maps JavaScript API
3. Create an API key
4. Add to backend `.env` file

#### HuggingFace
1. Sign up at https://huggingface.co/
2. Get your API token from settings
3. Add to backend `.env` file

#### Twilio
1. Sign up at https://www.twilio.com/
2. Get a phone number
3. Configure webhook to point to your backend server
4. Set up WebSocket streaming

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server will run on http://localhost:8080

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

## Project Structure

```
OperatorAI/
├── backend/
│   ├── index.js          # Main server file
│   ├── src/
│   │   ├── firebase.js   # Firebase database operations
│   │   └── utils.js      # Utility functions (AI analysis)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.tsx       # Main app component
│   │   └── firebaseConfig.ts
│   └── package.json
└── README.md
```

## Features

1. **Real-Time Transcription**: Uses AssemblyAI to transcribe calls in real-time
2. **AI Classification**: Categorizes emergencies using HuggingFace models
3. **Priority Queue**: Automatically prioritizes calls based on severity
4. **Location Tracking**: Extracts location information from call transcripts
5. **Live Dashboard**: Real-time operator dashboard showing all active calls

## Technology Stack

### Backend
- Node.js & Express
- WebSocket (ws)
- Firebase Realtime Database
- Twilio Programmable Voice
- AssemblyAI Real-Time API

### Frontend
- React + TypeScript
- Vite
- Chakra UI
- Firebase SDK
- Google Maps API

## Troubleshooting

### Backend won't start
- Check that all environment variables are set in `.env`
- Verify Firebase credentials are correct
- Ensure port 8080 is not in use

### Frontend shows no data
- Verify Firebase configuration matches your project
- Check that backend is running
- Ensure database rules allow read/write access

### Twilio calls not connecting
- Verify webhook URL is accessible from the internet
- Use ngrok or similar tool for local development: `ngrok http 8080`
- Update Twilio webhook URL with your ngrok URL

## Security Notes

⚠️ **Important**:
- Never commit `.env` files with real API keys
- Keep Firebase credentials private
- Use Firebase security rules in production
- Rotate API keys regularly

## Customization

### Change Branding
- Update logo in `assets/`
- Modify colors in frontend components
- Edit company name in `Landing.tsx` and `Footer.tsx`

### Modify AI Analysis
- Edit `backend/src/utils.js` to change classification logic
- Update priority algorithms as needed

## Next Steps

1. Set up your own Firebase project
2. Obtain all required API keys
3. Configure Twilio phone number
4. Deploy backend to a server (DigitalOcean, AWS, etc.)
5. Deploy frontend (Vercel, Netlify, etc.)
6. Set up SSL certificates for production

## Support

Created by Sathvik Vempati
GitHub: https://github.com/sathvikvempati

## License

MIT License - See LICENSE file for details
