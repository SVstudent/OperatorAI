# OperatorAI Demo Guide

**Created by: Sathvik Vempati**

## 🎬 How to Run the Demo

### 1. Start the Application

Make sure both frontend and backend are running:

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# Opens at http://localhost:5173

# Terminal 2 - Backend (optional for demo)
cd backend
npm start
# Runs at http://localhost:8080
```

### 2. View the Dashboard

Open http://localhost:5173 in your browser. You'll see:

- **Landing page** with OperatorAI branding
- **Dashboard** showing live emergency calls
- **Statistics cards**: Unresolved, Open, Dispatched, Resolved
- **Interactive map** with call locations
- **Calls table** with real-time transcripts

### 3. Demo Data

The demo includes **6 pre-populated emergency calls**:

| Priority | Type | Location | Status | Live |
|----------|------|----------|--------|------|
| HIGH | Crime in progress | 2nd Street, SF | DISPATCHED | No |
| HIGH | Fire emergency | 532 Geary St, SF | OPEN | No |
| LOW | Noise complaint | 350 DNA Way, SF | RESOLVED | No |
| HIGH | Gunshot reported | 600 Carmel Ave, SF | OPEN | No |
| MEDIUM | **Car accident** | **501 4th Ave, SF** | **OPEN** | **✅ LIVE** |
| HIGH | Medical emergency | 1234 Market St, SF | OPEN | ✅ LIVE |

### 4. Run the Scripted Demo Call

**This is the main demo feature!**

1. **Find a LIVE call** (look for the green pulsing indicator)
2. Click on the row to expand it
3. Click the green **"Join Call"** button
4. A modal will open showing a **simulated emergency call**

### 5. What Happens in the Demo Call

The demo call plays out **automatically** with a pre-scripted conversation **including audio**:

**Scenario: Car Accident with Child**

1. **AI Operator** (Female, professional voice): "Emergency services, what is your emergency?"
2. **Caller Lucas** (Male, slightly panicked voice): "Hi, my name is Lucas. I'm at 501 4th Ave and someone just crashed into my car."
3. **AI Operator**: "I understand, Lucas. Are you or anyone else injured?"
4. **Caller**: "I have my child with me. She looks fine but it's hard to check because my legs are stuck..."
5. **AI Operator**: "Stay calm. I am dispatching an ambulance and fire rescue..."
6. ...conversation continues...

**Audio Features:**
- 🎙️ **Male voice** (caller) - Slightly faster pace and higher pitch to convey panic
- 🎙️ **Female voice** (AI operator) - Calm, measured, professional tone
- 🔊 **"Speaking..." indicator** shows when audio is playing
- 💬 **Text appears synchronized** with the audio playback

### 6. Real-Time Updates

As the conversation plays:

- ✅ **Transcript updates** in the Firebase database
- ✅ **Dashboard reflects changes** in real-time
- ✅ **Call priority** may change based on keywords
- ✅ **Status automatically changes** to "DISPATCHED" at the end

### 7. Interactive Features to Demonstrate

#### Filter by Status
- Click the stat cards at the top to filter:
  - **Unresolved**: All open and dispatched calls
  - **Open**: New calls awaiting response
  - **Dispatched**: Help is on the way
  - **Resolved**: Completed calls

#### View on Map
- Click any call row to see it on the map
- Map shows color-coded markers by priority:
  - 🔴 RED = HIGH priority
  - 🟠 ORANGE = MEDIUM priority
  - 🟢 GREEN = LOW priority

#### Change Call Details
Expand any call and update:
- **Status**: Open → Dispatched → Resolved
- **Priority**: TBD → Low → Medium → High
- **Emergency Type**: Assign the type of emergency

All changes update in real-time across the dashboard!

## 🎭 Demo Script for Presentation

### Opening (30 seconds)
*"OperatorAI is an intelligent 911 call management system that helps emergency dispatchers handle high call volumes during crises. Let me show you how it works."*

### Dashboard Overview (30 seconds)
*"Here's the operator dashboard showing 6 active emergency calls. We can see 4 are still open, 1 has been dispatched, and 1 is resolved. Notice the two calls with the pulsing green indicator - those are live calls happening right now."*

### Live Call Demo (2 minutes)
*"Let me join this live car accident call. When I click 'Join Call', the AI operator is already engaging with the caller..."*

[Click Join Call and let the scripted conversation play with audio]

*"Notice how you can hear both voices - the panicked caller and the calm, professional AI operator responding. The transcript is updating in real-time in the background. The AI is gathering critical information - the caller's name, location, and the nature of the emergency. The system has detected this involves a child and potential injuries, automatically escalating it to HIGH priority."*

### Map Feature (30 seconds)
*"All calls are geocoded and displayed on this interactive map. Emergency responders can see exactly where help is needed and route the nearest units accordingly."*

### Workflow Management (1 minute)
*"Operators can change call statuses as they progress through the workflow. Let me mark this call as dispatched... and you can see it instantly updates across the entire dashboard. The system also allows filtering by status, priority, and emergency type."*

### Closing (30 seconds)
*"OperatorAI reduces wait times, ensures accurate information gathering, and helps dispatchers prioritize critical emergencies - potentially saving lives when every second counts."*

## 🔄 Resetting Demo Data

To reset and re-run the demo:

```bash
cd backend
node create-demo-data.js
```

This will recreate all 6 demo calls with fresh timestamps.

## 💡 Tips for a Great Demo

1. **Practice the flow** - Run through it 2-3 times before presenting
2. **Keep the browser at 100% zoom** for best visibility
3. **Use the live call** (Lucas - car accident) as your main demo
4. **Let the conversation play naturally** - it's timed for dramatic effect with audio
5. **Ensure audio is enabled** - Check your system volume before the demo!
6. **Highlight real-time updates** - refresh the page to show data persistence
7. **Demonstrate filtering** - show how operators can focus on priorities
8. **Show the map** - visual impact is strong
9. **Explain the technology stack** - Firebase, AssemblyAI, Google Maps

### 🔊 Audio Notes
- The demo uses **Web Speech Synthesis API** for text-to-speech
- **Male voice**: Slightly faster rate (1.15x) and higher pitch for panic
- **Female voice**: Slower rate (0.95x) for calm, professional tone
- If voices don't load, refresh the page once
- Works best on **Chrome/Edge** browsers (most voice options)

## 🚀 Technology Highlights for Presentation

- **Real-time transcription** via AssemblyAI
- **AI classification** with HuggingFace models
- **Live database** with Firebase Realtime Database
- **Geocoding** with Google Maps API
- **Priority algorithm** based on keywords and context
- **React + TypeScript** for type-safe frontend
- **Node.js + Express** for scalable backend

## 📱 Bonus: Mobile Demo

The dashboard is responsive! Open http://localhost:5173 on your phone to show mobile operator view.

---

**Questions during demo?** Just ask - you know the system inside and out now!

Good luck with your presentation! 🎉
