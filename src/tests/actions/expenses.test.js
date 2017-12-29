import { startAddExpense, editExpense, removeExpense, addExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

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
//Se le agrega el parámetro done, que se invoca en algún momento
//que indica hasta que momento se considera que el proceso habrá 
//finalizado.
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    //Debido a que se esta testeando un código asíncrono, que cuando finalice
    //se podrá comprobar el resultado final.
    //Se usará una forma especial de promises.
    //Se usa Promise Chaining. Se aclara en las promises.js de playground.
    //Se agrega un return a la instruccion que agrega los datos a la bd. Debido a que esa
    //es la línea que se quiere evaluar.
    //De esta forma, a partir del then de startAddExpense, se puede encadenar otro then de
    //acuerdo a lo que se retorna.
    //Para que jest las evalue completamente, se le debe indicar que es una instrucción
    //asíncronica.
    store.dispatch(startAddExpense(expenseData)).then(() => {
        //Se va a evaluar que se haga el dispatch de la acción correcta
        //en el store. Se aprovecha el uso de redux-mock-store.
        const actions = store.getActions();
        //Se evalua que la acción invocada sea ADD_EXPENSE con el expense
        //correcto.
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        //Tambien se va a testear que los datos hayan sido escritos correctamente
        //por lo cual se buscará consultarla.
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

        //Evalua correctamente la instrucción asíncronica.
        //done();
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        //Evalua correctamente la instrucción asíncronica.
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    
    store.dispatch(startAddExpense({})).then(() => {        
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
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