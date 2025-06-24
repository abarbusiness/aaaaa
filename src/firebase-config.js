import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXUJ0yGsU0DLEvE7cXrr1iCpQwkVQr5M4",
  authDomain: "vardaan-learning-institute.firebaseapp.com",
  projectId: "vardaan-learning-institute",
  storageBucket: "vardaan-learning-institute.firebasestorage.app",
  messagingSenderId: "772983862105",
  appId: "1:772983862105:web:22f16c844dd617a1305248"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
