import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios'
import PrimeVue from 'primevue/config';
import firebase from 'firebase/app'

import "primevue/resources/themes/saga-blue/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css" //icons
import 'primeflex/primeflex.css';

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';

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
    if (!app) {
        app = createApp(App)
        app.use(store)
        app.use(router)
        app.use(PrimeVue)

        app.component("Button", Button)
        app.component("DataTable", DataTable)
        app.component("Column", Column)
        app.component("Dialog", Dialog)
        app.component("InputText", InputText)
        app.component("InputNumber", InputNumber)
        app.component("Dropdown", Dropdown)
        app.component("TabView", TabView)
        app.component("TabPanel", TabPanel)
        app.component("Calendar", Calendar)

        app.mount('#app')

    }
})