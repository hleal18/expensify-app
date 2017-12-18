import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onClick = () => {
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                {/*Se accede al id que es pasado por el router y accedido mediante
            match y params. Se encuentra en la url.
            Consultar en la consola el history en la herramienta React.
        */}
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button
                    onClick={this.onClick}
                >
                    Remove
            </button>
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
    editExpense: (id, expense) => (dispatch(editExpense(id, expense))),
    removeExpense: (data) => (dispatch(removeExpense(data)))
});

export default connect(mapStateToProps, mapDispathToProps)(EditExpensePage);