import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import { setTimeout } from 'timers';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import getExpensesTotal from './selectors/expense-total';
import expenses from './tests/fixtures/expenses';

const store = configureStore();

//Provider permite proveer el Store (donde se guardan los estados de la app)
//a todos los componentes React que conforman la app.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

console.log('Total: ' + getExpensesTotal([]));


ReactDOM.render(jsx, document.getElementById('app'));