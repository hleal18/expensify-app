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
    //Para guardar expenses a un usuario especifico, se usa el segundo parametro.
    //que es getState que contiene el uid del user.
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0 
        } = expenseData;
        const ref = database.ref(`users/${uid}/expenses`).push();
        const key = ref.key;
        const expense = { description, note, amount, createdAt };
        dispatch(addExpense({id: key, ...expense}));
        dispatch(changeStateExpense(key, 'Adding new expense'));
        //Se retorna un promise cuando se complete exitosamente la adicion de un expense
        //de acuerdo al uid del usuario.
        return ref.set(expense).then((ref) => {
            dispatch(changeStateExpense(key, 'Saved expense'));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//FUNCION ASINCRONICA REMOVE_EXPENSE
export const startRemoveExpense = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        dispatch(changeStateExpense(id, 'Removing expense'))
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };    
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates    
});

//FUNCION ASINCRONICA EDIT_EXPENSE
export const startEditExpense = (id, update) => {
    return (dispatch, getState) => {
        dispatch(editExpense(id, update));
        dispatch(changeStateExpense(id, 'Editing expense'));
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(update).then(() => {
            dispatch(changeStateExpense(id, 'Saved expense'));
        });
    };
};

//MANIPULA EL REDUX STORE, OBTIENE LOS EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//FORMA ASÍNCRONICA DE SET EXPENSES
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        //Se obtienen los expenses de acuerdo al uid contenida en el state.
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                const expenses = [];

                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));
                expenses.forEach((expense) => {dispatch(changeStateExpense(expense.id, 'Saved expense'))});
            });
    };
};

//ACCION PARA ESTABLECER EL ESTADO DE UN EXPENSE
export const changeStateExpense = (id, message) => ({
    type: 'CHANGE_STATE_MESSAGE',
    id,
    message
});