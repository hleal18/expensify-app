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

const expenses = [{
    description: 'Coffe',
    note: 'nothing to say',
    amount: '35000',
    createdAt: 0
},{
    description: 'Chicken at diner',
    note: 'Really expensive',
    amount: '50000',
    createdAt: 103548560
},{
    description: 'Bills',
    note: 'The cheaper bill of the month ever had',
    amount: '89000',
    createdAt: -5000
}];

database.ref('expenses').push(expenses[0]);
database.ref('expenses').push(expenses[1]);
database.ref('expenses').push(expenses[2]);

// database.ref('notes/-L1UTHehXHPkSHf__sDV').remove();

// database.ref('notes/-L1UTHehXHPkSHf__sDV').update({
//     body: 'Buy food'
// });

//Push crea una nueva propiedad con un id generado.
//Ese objeto contiene el title y body asignados.
// database.ref('notes').push({
//     title: 'Course topics',
//     body: 'React Native, Angular, Python'
// });

//ARRAYS EN FIREBASE

// //Alternativa al usar arrays en firebase.
// //El id es un objeto que contiene el title y el body.
// const firebaseNotes = {
//     notes: {
//         apijasdf: {
//             title: 'First note!',
//             body: 'This is my note'
//         },
//         apijasdfpoijwe: {
//             title: 'Another note',
//             body: 'This is my note'
//         }
//     }
// };

// //Firebase no trabaja con arrays. Los arrays los estructura en objetos.
// const notes = [{
//     id: '12',
//     title: 'First note!',
//     body: 'This is my note'
// },{
//     id: '761ase',
//     title: 'Another note',
//     body: 'This is my note'
// }];

// database.ref('notes').set(notes);



//LECTURAS A LA BASE DE DATOS

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

//once obtiene los datos una sola vez.
//Todos los datos de la base de datos.
// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         //Snapshot contiene los datos pedidos.
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error fetching the data', e);
//     });
// //Especificando una ruta
// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         //Snapshot contiene los datos pedidos.
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error fetching the data', e);
//     });

//Ref permite referenciar una parte de la BD.
//Si no se especifica se manda a la root de la BD.
//Se pueden mandar diferentes parametro al set.
// database.ref().set({
//     name: 'Humberto',
//     age: 19,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Cartagena',
//         country: 'Colombia'
//     }
// }).then(() => {
//     console.log('Data is saved.');
// }).catch((e) => {
//     console.log('This failed. ', e);;
// });

//Se usa update para actualizar muchos datos en una invocación.
//Solo actualiza al nivel raíz. Si se hace a algo anidado, no funcionará como se espera.
// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });

//Se remueve el atributo isSingle
// database.ref('/isSingle').remove().then(() => {
//     console.log('The attirbute was succesfuly removed');
// }).catch((e) => {
//     console.log('There was an error: ' + e);
// });