//Star as = recolecta todos los named exports y los hace accesibles
//desde la variable definida como 'firebase'.
//Es recomendado usar esta sintaxis por firebase.
import * as firebase from 'firebase';
import { setTimeout } from 'timers';

//Se busca un provider para el servicio de autenticacion por medio de google.
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//Se agrega un proveedor de servicio de autenticacion de github.
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

//El objeto es provisto por firebase.
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

//Inicializa firebase con la app definida.
firebase.initializeApp(config);

//Se accede a la database
//Se pasa un objeto con datos que permitan testar si la conexión
//es correcta.
const database = firebase.database();

export { googleAuthProvider, githubAuthProvider, firebase, database as default };