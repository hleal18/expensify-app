import { createStore } from 'redux';

//Action generators. Funciones que retornan acciones. Se ponen en un solo lugar.
//Se usa destructuring en argumentos.
//Se usan funciones anónimas que reciben un objeto que por defecto, estará vacío.
//Se usa destructuring en el objeto pasado como parámetro y se le añade también
//en el campo un valor por defecto, lo que simplifica la asignación de valores.
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
});

//La función es un reducer, decide que hacer con respecto a la acción evaluada.
//Los reducer son funciones puras (el output esta determinado por el input, 
//no usa nada externo) toda la información que necesita está en el input.
//Nunca se cambia el state ni el action dentro.
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
            break;
        case 'DECREMENT':            
            return {
                count: state.count - action.decrementBy
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
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
     console.log(store.getState());
 });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));
