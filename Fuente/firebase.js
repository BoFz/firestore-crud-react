import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBtjS2cllWFmqVCQy_uaf1UPYo0PPtYS8w",
    authDomain: "fb-crud-react-53306.firebaseapp.com",
    databaseURL: "https://fb-crud-react-53306.firebaseio.com",
    projectId: "fb-crud-react-53306",
    storageBucket: "fb-crud-react-53306.appspot.com",
    messagingSenderId: "599470115078",
    appId: "1:599470115078:web:665d4042343cb0c02b3687"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
