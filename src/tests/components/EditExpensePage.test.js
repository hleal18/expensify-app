import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, startEditExpense, startRemoveExpense, history;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpense}
            history={history}
            startRemoveExpense={startRemoveExpense}
            expense={expenses[1]}
        />);
});

test('should render EditExpensePage correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle onClick', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
