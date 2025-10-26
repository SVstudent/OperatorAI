/**
 * Demo Data Generator for OperatorAI
 * Created by: Sathvik Vempati
 *
 * This script creates realistic demo data for showcasing the OperatorAI system
 * Run with: node create-demo-data.js
 */

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTGJN-9G8Cvs_p8T5GnVNvPjid9zzspRo",
  authDomain: "operator911-1acc3.firebaseapp.com",
  databaseURL: "https://operator911-1acc3-default-rtdb.firebaseio.com",
  projectId: "operator911-1acc3",
  storageBucket: "operator911-1acc3.firebasestorage.app",
  messagingSenderId: "274576573206",
  appId: "1:274576573206:web:363b44f8162a3ba69d0637",
  measurementId: "G-0CQ2HNLJ14"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Demo emergency calls with realistic data
const demoCallsgetCalls = [
  {
    callSid: "DEMO_CA_robbery_001",
    streamSid: "DEMO_ST_001",
    dateCreated: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    emergency: "Crime in progress",
    geocode: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    live: false,
    location: "2nd Street, San Francisco, CA",
    name: "John Smith",
    phone: "+14155551234",
    priority: "HIGH",
    status: "DISPATCHED",
    transcript: "Hello, my name is John and I am calling to report an emergency. I am at 2nd street and I have just witnessed an armed robbery. The suspect is still on the scene and I am afraid they may try to harm me or others. Please send help immediately. This is a life-threatening situation and I need assistance right away. Thank you."
  },
  {
    callSid: "DEMO_CA_fire_002",
    streamSid: "DEMO_ST_002",
    dateCreated: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
    emergency: "Fire emergency",
    geocode: { lat: 37.7869, lng: -122.4041 }, // San Francisco
    live: false,
    location: "532 Geary Street, San Francisco, CA",
    name: "Bob Johnson",
    phone: "+14155555678",
    priority: "HIGH",
    status: "OPEN",
    transcript: "Hello, my name is Bob. I am at 532 Geary Street and there is a fire in my apartment building. I am not sure if anyone else is in the building, but I am safely outside. Please send help immediately. This is a life-threatening situation and I need assistance right away. Thank you."
  },
  {
    callSid: "DEMO_CA_noise_003",
    streamSid: "DEMO_ST_003",
    dateCreated: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    emergency: "Other emergency",
    geocode: { lat: 37.7652, lng: -122.4342 }, // San Francisco
    live: false,
    location: "350 DNA Way, San Francisco, CA",
    name: "Liam Davis",
    phone: "+14155559012",
    priority: "LOW",
    status: "RESOLVED",
    transcript: "I am Liam. I am at 350 DNA Way, and there is a party going above my apartment for hours now. They are putting on very loud music which is very disturbing and I have to go back to work tomorrow morning."
  },
  {
    callSid: "DEMO_CA_gunshot_004",
    streamSid: "DEMO_ST_004",
    dateCreated: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
    emergency: "Crime in progress",
    geocode: { lat: 37.7614, lng: -122.4464 }, // San Francisco
    live: false,
    location: "600 Carmel Ave, San Francisco, CA",
    name: "Noah Martinez",
    phone: "+14155553456",
    priority: "HIGH",
    status: "OPEN",
    transcript: "Hey, my name is Noah. I am at 600 Carmel Ave, and I heard a gunshot close to me, but I do not know the direction. I am safe in my house, but I think someone got hurt or might get hurt if you do not rush. Please come fast!"
  },
  {
    callSid: "DEMO_CA_accident_005",
    streamSid: "DEMO_ST_005",
    dateCreated: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    emergency: "Traffic accident",
    geocode: { lat: 37.7726, lng: -122.4099 }, // San Francisco
    live: true,
    location: "501 4th Ave, San Francisco, CA",
    name: "Lucas Wilson",
    phone: "+14155557890",
    priority: "MEDIUM",
    status: "OPEN",
    transcript: "Hey, I am Lucas, I am at home at 501 4th Ave and I was just getting out of my garage and someone just crashed into me. I am very concerned. I have my child with me. She looks fine but it is hard to check because my legs are stuck and I cannot move. I do not know if I am bleeding or not. Can you please come as soon as possible?"
  },
  {
    callSid: "DEMO_CA_medical_006",
    streamSid: "DEMO_ST_006",
    dateCreated: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
    emergency: "Medical emergency",
    geocode: { lat: 37.7833, lng: -122.4167 }, // San Francisco
    live: true,
    location: "1234 Market Street, San Francisco, CA",
    name: "Sarah Anderson",
    phone: "+14155552345",
    priority: "HIGH",
    status: "OPEN",
    transcript: "Please help! My name is Sarah Anderson and I'm at 1234 Market Street. My elderly mother just collapsed and she's not responding. She's breathing but unconscious. Please send an ambulance right away!"
  }
];

async function createDemoData() {
  console.log('🚀 Creating demo data for OperatorAI...\n');

  try {
    for (const call of demoCallsgetCalls) {
      await set(ref(db, `/calls/${call.callSid}`), call);
      console.log(`✅ Created ${call.priority} priority call: ${call.emergency} at ${call.location}`);
    }

    console.log(`\n✨ Successfully created ${demoCallsgetCalls.length} demo calls!`);
    console.log('\n📊 Summary:');
    console.log(`   - HIGH priority: ${demoCallsgetCalls.filter(c => c.priority === 'HIGH').length} calls`);
    console.log(`   - MEDIUM priority: ${demoCallsgetCalls.filter(c => c.priority === 'MEDIUM').length} calls`);
    console.log(`   - LOW priority: ${demoCallsgetCalls.filter(c => c.priority === 'LOW').length} calls`);
    console.log(`   - OPEN status: ${demoCallsgetCalls.filter(c => c.status === 'OPEN').length} calls`);
    console.log(`   - DISPATCHED status: ${demoCallsgetCalls.filter(c => c.status === 'DISPATCHED').length} calls`);
    console.log(`   - RESOLVED status: ${demoCallsgetCalls.filter(c => c.status === 'RESOLVED').length} calls`);
    console.log(`   - LIVE calls: ${demoCallsgetCalls.filter(c => c.live).length} calls`);

    console.log('\n🌐 View your demo at: http://localhost:5173');
    console.log('\n💡 Tip: You can modify call statuses in the Firebase Console to demonstrate workflow!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating demo data:', error);
    process.exit(1);
  }
}

createDemoData();
