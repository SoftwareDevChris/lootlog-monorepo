// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwqE4czX2gQPelhGZdDcYvUvzuAeB1qIA",
  authDomain: "lootlog-1c993.firebaseapp.com",
  projectId: "lootlog-1c993",
  storageBucket: "lootlog-1c993.appspot.com",
  messagingSenderId: "27854388694",
  appId: "1:27854388694:web:a8620ee185df2e35a87877",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
