import { createStore } from 'redux';

//Se createStore retorna un objeto Store, que contiene el estado de la app.
const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + incrementBy
            };
            break;
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };
            break;
        case 'RESET':
            return {
                count: 0
            };
            break;
        case 'SET':
            return {
                count: action.count
            }
            break;
        default:
            return state;
    }
});

//Se invoca la función cada vez que el estado cambia.
//Para desuscribir, se guarda el retorno de subscribe y se invoca luego
//para hacer efectiva la desubscripción.
 const unsubscribe = store.subscribe(() => {
     console.log(store.getState());
 });

 //Las Actions siempre deben tener un 'type' como mínimo.

store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});

//Solo se imprime una vez el estado por consola.
//unsubscribe();

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'RESET'
});

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
});

store.dispatch({
    type: 'SET',
    count: 101
})