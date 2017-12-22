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
    isSingle: true,
    location: {
        city: 'Cartagena',
        country: 'Colombia'
    }
});

//Al realizar set, se ponen los datos en la bd, sin importar los que ya estaban guardados.
//Es decir, solo se mostrará This is my data.
//database.ref().set('This is my data');

//Cuando se quiere actualizar un dato, se pone un parámetro a ref.
//especificando que parte de la bd se desea actualizar.
database.ref('age').set(23);
//Para referenciar un campo de un objeto
database.ref('location/city').set('New York');

//Se añade un nuevo campo a la raíz de la BD.
database.ref('attributes').set({
    height: 163,
    weight: 43
});
//Se puede usar lo siguiente, o el anterior.
// database.ref().update({
//     attributes: {
//         height: 162,
//         weigth: 43
//     }
// });

//Las consultas anteriores son asíncronas. No se ejecutan de forma secuencial debido a la tarea
//que deben realizar para gestionar operaciones con el servidor.
console.log('I made a request to change the data');