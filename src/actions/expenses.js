import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

//ASYNC REDUX ACTIONS
//Forma asincronica de retornar el objeto para posteriormente
//el dispatch lo aproveche.
export const startAddExpense = (expenseData = {}) => {
    //Retorna una funcion.
    //Se busca que el componente primero realice operaciones con la BD.
    //Como son asíncrónicas, esto permite que al terminar aquella tarea,
    //se invoque el dispatch para así mantener todos los datos correctamente
    //actualizados y visualizados.
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0 
        } = expenseData;
        const expense = { description, note, amount, createdAt };
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates    
});

