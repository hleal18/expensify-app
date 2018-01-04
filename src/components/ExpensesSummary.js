import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expense-total';
import getVisibleExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpenseTotal = numeral(props.expensesTotal/100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{props.expenseCount}</span> {expenseWord} totalling <span>{formattedExpenseTotal}</span></h1>
                {
                    props.hiddenExpenses !== 0 && props.hiddenExpenses ?
                        <h2 className="page-header__title">Hiding <span>{props.hiddenExpenses}</span> expense due to the filters.</h2> 
                        :
                        <h2 className="page-header__title">Showing all the expenses.</h2>
                }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    const hiddenExpenses = state.expenses.length - visibleExpenses.length;
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses),
        hiddenExpenses
    };
};

export default connect(mapStateToProps)(ExpensesSummary);