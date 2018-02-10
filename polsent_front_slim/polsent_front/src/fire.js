  // Initialize Firebase
  import firebase from 'firebase'
  var config = {
    apiKey: "AIzaSyA1IdWmTw4EaWcJxtuwUNkvNCvvSd0Jw0w",
    authDomain: "news-sent.firebaseapp.com",
    databaseURL: "https://news-sent.firebaseio.com",
    projectId: "news-sent",
    storageBucket: "news-sent.appspot.com",
    messagingSenderId: "490576532877"
  };
  var fire = firebase.initializeApp(config);
  export default fire;