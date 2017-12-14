import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

//Se reutiliza ExpenseForm y se conecta con connect de redux
const AddExpensePage = (props) => (
    <div>
        <h1>Add expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                props.dispatch(addExpense(expense));
                //Lo provee router. Permite redireccionar cuando se suban los datos.
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddExpensePage);