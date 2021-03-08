import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios'
import firebase from 'firebase/app'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBKlHr43HCSu0-6vOf4cyo5tJRAcWwaFgQ",
    authDomain: "clarotest-79974.firebaseapp.com",
    projectId: "clarotest-79974",
    storageBucket: "clarotest-79974.appspot.com",
    messagingSenderId: "914319148607",
    appId: "1:914319148607:web:adbbd0544a5d7a88e41a8a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let app

  firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if(!app){
          app = createApp(App).use(store).use(router).mount('#app')
      }
  })


