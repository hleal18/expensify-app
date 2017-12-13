import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    //Se crea el objeto modelo que se agregará y se comparará.
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };
    //se obtiene el valor de retorno de la función (esta vez contiene un id generado)
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            //debido a que es aleatorio el id, se usa una función que compara
            //que el tipo analizado sea el que se quiere, en este caso
            //un string.
            id: expect.any(String)
        }
    })
});

//Una prueba unitaria para los valores por defecto, cuando no se provee un objeto
//a añadir sino uno por defecto.
test('should set up the ad expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
});