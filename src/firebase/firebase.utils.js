import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8ZneoOkbloKJCV04N3Ujw77hKr_dCO8I",
    authDomain: "e-commerce-prj-57a14.firebaseapp.com",
    projectId: "e-commerce-prj-57a14",
    storageBucket: "e-commerce-prj-57a14.appspot.com",
    messagingSenderId: "944238065797",
    appId: "1:944238065797:web:dcd793d15aaf8f6eddd1ec",
    measurementId: "G-GBGXWB3RW9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_acount'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;