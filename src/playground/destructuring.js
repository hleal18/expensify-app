//OBJECT DESTRUCTURING
// console.log('destructuring');

// const person = {
//     name: 'Humberto',
//     age: 20,
//     location: {
//         city: 'Cartagena',
//         temperatura: 31
//     }
// };

// //Esto es igual
// //Se puede poner un valor por defecto.
// //Tambien se puede juntar con el de renombrar.
// const {name: firstName = 'Anonymous', age} = person;
// // a esto
// // const name = person.name;
// // const age = person.age;

// console.log(firstName + ' is ' + age + '.');

// // const { city, temperatura } = person.location;
// // if (person.location.temperatura && person.location.city) {
// //     console.log('It\'s ' + temperatura + ' in ' + city + '.');
// // }

// //Si se quieren renombrar los campos
// const {city, temperatura: temp} = person.location;
// if (temp && person.location.city) {
//     console.log('It\'s ' + temp + ' in ' + city + '.');
// }

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-published'} = book.publisher
// console.log(publisherName);

//ARRAY DESTRUCTURING
// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

//Coincide con posiciones de acuerdo a como estén guardadas en el arreglo.
//const [street, city, state, zip] = address;
//Se pueden saltar algunos items. De forma que solo se destructuring los necesarios.
//No hay renombración.
//Si hay defaults.
// const [, city, state = 'New York'] = address;

// console.log('You are in ' + city + ' ' + state + '.');

const item = ['Coffe (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mediumPrice] = item;

console.log('A medium ' +  itemName + ' costs ' + mediumPrice);