<<<<<<< HEAD

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const database = getFirestore(app)
const storage = getStorage(app)

export {auth, database, storage}
=======
void 
>>>>>>> 4c0d3e2bb1cd54bf6405a2fae8fd0569dba42dc7
