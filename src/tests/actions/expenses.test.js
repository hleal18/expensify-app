import { startAddExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

//Se le pasa un array de middlewares.
const createMockStore = configureMockStore([thunk]);

//test case para remover expenses.
test('should set-up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    //se usa toEqual para comparar todas las propiedades de los objetos comparados.
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

//test case para editar expenses
test('should set up edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

//Test case para agregar un expense con datos provistos.
test('should set up add expense action object with provided values', () => {
    //se obtiene el valor de retorno de la función (esta vez contiene un id generado)
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

//Se busca usar mock store, para comprobar los datos guardados.
//Se usa redux-mock-store para testear
test('should add expense to database and store', () => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    //
    store.dispatch(startAddExpense(expenseData))
});

test('should add expense with defaults to database and store', () => {

});

//Una prueba unitaria para los valores por defecto, cuando no se provee un objeto
//a añadir sino uno por defecto.
// test('should set up the ad expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     })
// });