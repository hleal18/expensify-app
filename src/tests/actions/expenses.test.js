import { startAddExpense, editExpense, removeExpense, addExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

//Se le pasa un array de middlewares.
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    //Se busca que antes de cada test case, los fixtures de los archivos se guarden firebase
    //y así ver como se comporta la base de datos.
    const expensesData = {};
    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        //Segun entiendo: se crea un objeto con la id que a la vez es un objeto que contiene
        //los demas campos.
        expensesData[id] = { description, amount, note, createdAt };
    });
    //Como se pretende correr el beforeEach antes de cada test case, y es un proceso asíncrono,
    //debe asegurarse que se le indique a jest que es un proceso asíncrono y que espere a que finalice.
    database.ref('expenses').set(expensesData).then(() => done());
});

//test case para remover expenses.
test('should set-up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    //se usa toEqual para comparar todas las propiedades de los objetos comparados.
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

//test case para la forma asincronica de remove expense
test('should remove expenses from firebase', (done) => {
    const store = createMockStore();
    store.dispatch(startRemoveExpense(expenses[0]))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id: expenses[0].id
            });

            //Retorna un promise que evita se invoque un then en un ambiente anidado.
            //Se va a testear que los expenses guardados tengan uno menos, el que se
            //removió.
            return database.ref('expenses').once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual([
                {
                    description: expenses[1].description,
                    note: expenses[1].note,
                    amount: expenses[1].amount,
                    createdAt: expenses[1].createdAt
                },{
                    description: expenses[2].description,
                    note: expenses[2].note,
                    amount: expenses[2].amount,
                    createdAt: expenses[2].createdAt
                }
            ]);
            done();
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

test('should set up set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    //Se crea el store
    const store = createMockStore({});
    //Se comprueba que al realizar dispatch, si se tuvo exito, se invocaron las acciones
    //correctas.
    store.dispatch(startSetExpenses()).then(() => {
        //Al tener exito la operacion de la accion, se comprueba si la accion invocada
        //fue SET_EXPENSES.
        const actions = store.getActions();
        //Solo debe haber una accion, con el tipo 'SET_EXPENSES' y los expenses que en un principio
        //se agregaron, que son los de fixtures (contenidos en el beforeEach).
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        //Se le indica que todos es una instrucción asíncronica.
        done();
    });
});

