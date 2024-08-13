import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBD3AMus_c7xxZ8dcM4l18LQY-yNSF13pM",
    authDomain: "ibl-dev-c9d6f.firebaseapp.com",
    projectId: "ibl-dev-c9d6f",
    storageBucket: "ibl-dev-c9d6f.appspot.com",
    messagingSenderId: "319614569697",
    appId: "1:319614569697:web:78f39666eef50073ff3ba0",
    measurementId: "G-VJSMC6SM2V"
};

const app = firebase.initializeApp(firebaseConfig);
firebase.firestore();

export const storage = getStorage(app);

export default firebase;