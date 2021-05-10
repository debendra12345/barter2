import firebase from 'firebase';
require('@firebase/firestore')


const firebaseConfig = {
    apiKey: "AIzaSyAafSZYxDaqBvqS0QlS4gnUlFVzc0OJmok",
    authDomain: "barterapp-a6894.firebaseapp.com",
    databaseURL:"https://barterapp-a6894.firebaseio.com",
    projectId: "barterapp-a6894",
    storageBucket: "barterapp-a6894.appspot.com",
    messagingSenderId: "475010571224",
    appId: "1:475010571224:web:9db3f1eb292291bf8230ad"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();