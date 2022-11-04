import { initializeApp } from "firebase/app"; 
import { getFirestore } from "@firebase/firestore"; 
import { initializeAuth, browserLocalPersistence } from "firebase/auth"; 
 
const firebaseConfig = {
    apiKey: "AIzaSyBxVgXQz6vg-YYgEN275e9Ai58UCDnk_Lw",
    authDomain: "chawkbazar-8dea5.firebaseapp.com",
    projectId: "chawkbazar-8dea5",
    storageBucket: "chawkbazar-8dea5.appspot.com",
    messagingSenderId: "611618791725",
    appId: "1:611618791725:web:7e5a7ad087aba8f01d33a4",
    measurementId: "G-9G0VYQVTHG"
};

const app = initializeApp(firebaseConfig); 
export const firestoreRef = getFirestore(app);
export const auth = initializeAuth(app, {
    persistence: browserLocalPersistence
});
