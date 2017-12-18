import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

//Para evitar la escritura innecesaria de implementación en los tests.
//Se usan los lifecycle methods en el inciso global de la doc. de jest.
let onSubmit, history, wrapper;

//Se activa antes de cada test
beforeEach(() => {
    onSubmit = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);
});

//Se obtiene un snapshot con la muestra de los renderizado por el componente.
test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    //Se quiere accionar el onSubmit del componente ExpenseForm.
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    //Despues de accionar el evento, se comprueba que los spies fueron llamados.
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
});