import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "-sI",
    authDomain: "-6f094..com",
    databaseURL: "https://viewvote-6f094.firebaseio.com",
    projectId: "viewvote-6f094",
    storageBucket: "viewvote-6f094.appspot.com",
    messagingSenderId: "45757175857",
    appId: "1:45757175857:web:86c64eb06e09d8d836dd10",
    measurementId: "G-EL85GPP4DN"
  };

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage, firebase as default }
