import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expense-total';
import getVisibleExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpenseTotal = numeral(props.expensesTotal/100).format('$0,0.00');
    return (
        <div>
            <h1>Viewing {props.expenseCount} {expenseWord} totalling {formattedExpenseTotal}</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);