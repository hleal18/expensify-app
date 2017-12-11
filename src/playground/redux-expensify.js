import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Se van a crear reducers que gestionen el estado.

//ADD_EXPENSE
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
//EDIT_EXPENSE
//SET_TEXT_FILTER
//SORT_BY_DATE
//SORT_BY_AMOUNT
//SET_START_DATE
//SET_END_DATE

//EXPENSES REDUCER

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //Se puede usar el es6 spread operator en arreglos.
            return [
                ...state,
                action.expense
            ];
            break;
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
            break;
        default:
            return state;
    }

};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffe', amount: 300 }));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

//Dos reducers para cada estado importante, los objetos expenses y filters.
//Luego se combinan para hacer el principal.
const demoState = {
    expenses: [{
        id: 'pijasdfhwer',
        description: 'January rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}