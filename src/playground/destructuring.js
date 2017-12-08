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

const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-published'} = book.publisher
console.log(publisherName);