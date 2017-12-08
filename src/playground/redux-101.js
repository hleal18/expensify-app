import { createStore } from 'redux';

//Se createStore retorna un objeto Store, que contiene el estado de la app.
const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
            break;
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
            break;
        case 'RESET':
            return {
                count: 0
            };
            break;
        default:
            return state;
    }
});

//Se imprime un campo en la consola que es getState.
console.log(store.getState());

//incrementar el estado del count con uno.
//Para ello, se usan Actions. Son enviados al Store por medio de dispatch.
//Para ello el segundo parámetro de esa función, se compara con un if interno
//Y lo modifica de la forma especificada.
//Provoca que la función asignada a store al usar createStore, se ejecuta.

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'RESET'
});

console.log(store.getState());