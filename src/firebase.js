import firebase from "firebase/app"
import "firebase/auth"

// exportamos como objeto
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCiCqDc1I7VvD5xvMfAwD0gB42dHQjO2Fo",
    authDomain: "chatapp-81976.firebaseapp.com",
    projectId: "chatapp-81976",
    storageBucket: "chatapp-81976.appspot.com",
    messagingSenderId: "631343701753",
    appId: "1:631343701753:web:b34c96da5468a64b89cc28"
  }).auth();