import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

//Evalua el estado inicial, debe ser un arreglo vacio
test('should set default state', () => {
    const action = { type: '@@INIT' };
    const state = expensesReducer(undefined, action);
    //Puede ser este
    expect(state).toEqual([]);
    //o este
    expect(state).toHaveLength(0);
});

//Evalua si se logra eliminar un expense cuando se guardan dos.
test('should evaluate remove an expense from the state', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

//Evalua si no se remueve algun expense al pasar un id que no se encuentra
test('should not remove an expense with a not found id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: -1 };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

//Evalua si se logra agregar un expense.
test('should add and expense', () => {
    const adding_expense = {
        id: '4',
        description: 'Carne',
        note: '',
        amount: 10000,
        createdAt: 15000
    };
    const action = { type: 'ADD_EXPENSE', expense: adding_expense };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, adding_expense]);
});

//Se comprueba la edición de un expense en un stado de dos expenses.
test('should evaluate edit an specific expense', () => {
    const updates = {
        description: 'third coffee of the month',
        amount: 10000
    };
    const action = { 
        type: 'EDIT_EXPENSE', 
        id: expenses[2].id,
        updates: updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[2].description).toBe(updates.description);
    expect(state[2].amount).toBe(updates.amount);
});

//Se comprueba la edición de un expense cuando no se encuentra
test('should not edit an expense with a not found id', () => {
    const updates = {
        description: 'third coffee of the month',
        amount: 10000
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});