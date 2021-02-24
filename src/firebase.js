import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBDNa99KeEtX9y60Q747eX3QOSfXPlXK4I",
    authDomain: "wx-288c3.firebaseapp.com",
    projectId: "wx-288c3",
    storageBucket: "wx-288c3.appspot.com",
    messagingSenderId: "1074532539468",
    appId: "1:1074532539468:web:3a90f07abcdb456cada8e9",
    measurementId: "G-QMVL7B2031"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;