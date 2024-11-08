// src/firebase.ts
import * as admin from "firebase-admin";
import * as serviceAccount from "./firebase-adminsdk.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const firebaseAdmin = admin;
