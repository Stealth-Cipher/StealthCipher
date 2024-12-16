import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "stealth-cipher.firebaseapp.com",
  projectId: "stealth-cipher",
  storageBucket: "stealth-cipher.appspot.com",
  messagingSenderId: "581326886241",
  appId: "1:581326886241:web:c441d40d8d5c1c1f4741a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);