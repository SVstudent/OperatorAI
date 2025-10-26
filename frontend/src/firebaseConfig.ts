import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration for OperatorAI
// Created by: Sathvik Vempati
const firebaseConfig = {
  apiKey: "AIzaSyCTGJN-9G8Cvs_p8T5GnVNvPjid9zzspRo",
  authDomain: "operator911-1acc3.firebaseapp.com",
  databaseURL: "https://operator911-1acc3-default-rtdb.firebaseio.com", // You need to verify this URL in Firebase Console
  projectId: "operator911-1acc3",
  storageBucket: "operator911-1acc3.firebasestorage.app",
  messagingSenderId: "274576573206",
  appId: "1:274576573206:web:363b44f8162a3ba69d0637",
  measurementId: "G-0CQ2HNLJ14"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
