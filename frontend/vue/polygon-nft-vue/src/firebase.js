import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from  'firebase/storage';

const firebaseConfig = { 
    // Add your config here
    apiKey: "AIzaSyCwvaVsiPlVwvAASOiBoOAsUiesnCVUzeY",
    authDomain: "polygon-nft-generator.firebaseapp.com",
    projectId: "polygon-nft-generator",
    storageBucket: "polygon-nft-generator.appspot.com",
    messagingSenderId: "245300688299",
    appId: "1:245300688299:web:af217488a565e96a7b4eee"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);