
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCftBlKv3i-TQCmyyUYFbCGAU-dKGK_GNs",
  authDomain: "webcarros-47751.firebaseapp.com",
  projectId: "webcarros-47751",
  storageBucket: "webcarros-47751.firebasestorage.app",
  messagingSenderId: "342794520931",
  appId: "1:342794520931:web:4dad8b0235155fbb05ab56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const data = getDatabase(app)
const storage = getStorage(app)

export {auth, data, storage}
