//Star as = recolecta todos los named exports y los hace accesibles
//desde la variable definida como 'firebase'.
//Es recomendado usar esta sintaxis por firebase.
import * as firebase from 'firebase';

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

//Ref permite referenciar una parte de la BD.
//Si no se especifica se manda a la root de la BD.
//Se pueden mandar diferentes parametro al set.
database.ref().set({
    name: 'Humberto',
    age: 19,
    job: 'Software developer',
    location: {
        city: 'Cartagena',
        country: 'Colombia'
    }
}).then(() => {
    console.log('Data is saved.');
}).catch((e) => {
    console.log('This failed. ', e);;
});

//Se usa update para actualizar muchos datos en una invocación.
//Solo actualiza al nivel raíz. Si se hace a algo anidado, no funcionará como se espera.
database.ref().update({
    job: 'Manager',
    //Para modificar atributo anidado, se usa la ruta.
    'location/city': 'Boston'
});

//Se remueve el atributo isSingle
// database.ref('/isSingle').remove().then(() => {
//     console.log('The attirbute was succesfuly removed');
// }).catch((e) => {
//     console.log('There was an error: ' + e);
// });