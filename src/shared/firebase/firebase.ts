import { initializeApp } from "firebase/app";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    getAuth,
} from "firebase/auth";

const firebaseConfig = {
    appId: process.env.REACT_APP_APP_ID,
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const auth = getAuth(app);
auth.useDeviceLanguage();
