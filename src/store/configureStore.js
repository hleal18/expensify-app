import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';


//Evalua si los dev-tools estan disponibles, si no, lo ignora (creo).
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Se está exportando una función.
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        //applyMiddleware permite añadir middleware a Redux.
        //se usa composeenhancer para mantener los dev-tools y
        //usar thunk.
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
