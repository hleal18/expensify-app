const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //Se puede usar el es6 spread operator en arreglos.
            return [
                ...state,
                {
                    ...action.expense,
                    confirmed: false
                }
            ];            
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);            
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    //Se ponen los atributos que ya posee expense
                    //Se sobreescriben los que poseen updates del Action generator.
                    return {
                        ...expense,
                        ...action.updates,
                        confirmed: false
                    };                    
                } else {
                    return expense;                    
                }
            });
        case 'SET_EXPENSES':            
            return action.expenses.map((expense) => ({...expense, confirmed: true }));
        case 'CONFIRM_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        confirmed: true
                    };
                } else {
                    return expense;
                };
            });
        default:
            return state;
    }
};