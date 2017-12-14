import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { setTimeout } from 'timers';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill.', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));
store.dispatch(setTextFilter('bill'));

setTimeout(() => {
<<<<<<< HEAD
    store.dispatch(setTextFilter('rent'));
=======
    store.dispatch(setTextFilter('water'));
>>>>>>> e9dd826872f44da9b0436f62599612af3e2b1c0c
}, 3000)

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

//Provider permite proveer el Store (donde se guardan los estados de la app)
//a todos los componentes React que conforman la app.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));