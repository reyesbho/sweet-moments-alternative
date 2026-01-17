import { cert, initializeApp as initializeAppAdmin } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = initializeAppAdmin({
  credential: cert({
    projectId: import.meta.env.VITE_FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: import.meta.env.VITE_FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: import.meta.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});


export const authFirebaseAdmin = getAuth(app);
