import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import React from 'react';
import expenses from '../fixtures/expenses';
import getExpensesTotal from '../../selectors/expense-total';

test('should render correctly ExpensesSummary for one expense and two hidden', () => {
    const expensesTest = [expenses[0]];
    const wrapper = shallow(
        <ExpensesSummary
            expenseCount={expensesTest.length}
            expensesTotal={getExpensesTotal(expensesTest)}
            hiddenExpenses={expenses.length - expensesTest.length}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('should render correctly ExpensesSummary for multiple expenses and no one hidden', () => {
    const wrapper = shallow(
        <ExpensesSummary 
        expenseCount={expenses.length} 
        expensesTotal={getExpensesTotal(expenses)}
        />
    );
    expect(wrapper).toMatchSnapshot();
});