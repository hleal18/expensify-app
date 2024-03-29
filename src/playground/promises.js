//Recibe una función. Va a ser una tarea asíncrona.
//Cuando se complete se llama a el resultado correcto o fallido.
//La naturaleza de las promises implica que solo se pueda resolver o denegar una sola vez.
//No pueden haber dos resolve o dos reject. Las segundas se ignorarían.
const promise = new Promise((resolve, reject) => {
    //Se ejecuta el resolve despues de 1.5s, para observar el comportamiento.
    setTimeout(() => {
        resolve({
            name: 'Humberto',
            age: 19
        });

        // reject('Something went wrong!');
    }, 1500);
});
//Normalmente se usaran promises provistas por API's.
//No hay necesidad de implementarlas.
//Solo de proveer los handlers, es decir, el 'then' seguido
//de el éxito de la función y el fallo de la misma, según el caso.
console.log('before');

//Permite llamar a un callback que manipula unos datos.
//Invoca la función que se le pasó como parámetro de forma asíncrona.
promise.then((data) => {
    console.log('1', data);
    //Debido a que al usar reject se lanza un error de javascript, se atrapa con catch.
    //y así, manejar un error correctamente.
    //Se prueban los promise chaining, agregando otro 'then' al anterior.
    //Este recibe el dato de retorno del primer 'then'.
    //Se puede retornar una nueva promesa.
    //Sirve para evitar anidar muchos callbacks con el then (creo).
    return new Promise((resolve, reject) => {
        //Se ejecuta el resolve despues de 1.5s, para observar el comportamiento.
        setTimeout(() => {
            resolve('This is my other promise.');
        }, 1500);
    });
}).then((str) => {
    //Se tiene acceso a str obtenido del then anterior.
    //El segundo then se acciona despues del primero.
    console.log('does this runs?', str);
}).catch((error) => {
    console.log('error: ', error);
});

//Otra forma.
// promise.then((data) => {
//     console.log('1', data);
// }), ((error) => {
//     console.log('error: ', error);
// });

// promise.then((data) => {
//     console.log('2', data);
// });

console.log('after');