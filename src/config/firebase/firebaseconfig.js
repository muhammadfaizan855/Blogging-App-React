import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD3Llw4QZKexvACSWT7GST2jp7q_7iS_g4",
  authDomain: "blogging-app-dbb7d.firebaseapp.com",
  projectId: "blogging-app-dbb7d",
  storageBucket: "blogging-app-dbb7d.appspot.com",
  messagingSenderId: "180218706645",
  appId: "1:180218706645:web:bd5579dcb9dc75459b805c",
  measurementId: "G-SDF3902ZQH"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app