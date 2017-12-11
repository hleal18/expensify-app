const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //Se puede usar el es6 spread operator en arreglos.
            return [
                ...state,
                action.expense
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
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });            
        default:
            return state;
    }
};