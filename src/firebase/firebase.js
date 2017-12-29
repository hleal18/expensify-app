//Star as = recolecta todos los named exports y los hace accesibles
//desde la variable definida como 'firebase'.
//Es recomendado usar esta sintaxis por firebase.
import * as firebase from 'firebase';
import { setTimeout } from 'timers';

//El objeto es provisto por firebase.
const config = {
    apiKey: "AIzaSyAnzmR-ZDXfUUI3YH1-IR6OPWtpt6RsXWY",
    authDomain: "expensify-50a5f.firebaseapp.com",
    databaseURL: "https://expensify-50a5f.firebaseio.com",
    projectId: "expensify-50a5f",
    storageBucket: "expensify-50a5f.appspot.com",
    messagingSenderId: "359905664699"
};

//Inicializa firebase con la app definida.
firebase.initializeApp(config);

//Se accede a la database
//Se pasa un objeto con datos que permitan testar si la conexión
//es correcta.
const database = firebase.database();

export { firebase, database as default };