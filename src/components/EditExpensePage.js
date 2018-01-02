import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onClick = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                {/*Se accede al id que es pasado por el router y accedido mediante
            match y params. Se encuentra en la url.
            Consultar en la consola el history en la herramienta React.
                */}
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button
                        className="button button--secondary"
                        onClick={this.onClick}
                    >
                        Remove Expense
                    </button>
                </div>
            </div>
        )
    }
}

//Se debe acceder a los props del componente original, con ello es suficiente
//agregar el segundo argumento de props.
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
    }
}

const mapDispathToProps = (dispatch) => ({
    startEditExpense: (id, expense) => (dispatch(startEditExpense(id, expense))),
    startRemoveExpense: (data) => (dispatch(startRemoveExpense(data)))
});

export default connect(mapStateToProps, mapDispathToProps)(EditExpensePage);