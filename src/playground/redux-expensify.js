import { createStore, combineReducers } from 'redux';

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
        sstartDate: undefined,
        endDate: undefined
    }
}