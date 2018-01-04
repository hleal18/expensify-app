import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

//Se reutiliza ExpenseForm y se conecta con connect de redux
//Se pasa a una clase
//Como se quiere testear es la versión aislada de AddExpensePage
//Se exporta individualmente (no como default)
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        //Debido a la dificultad de testear lo siguiente.
        //Ya que se invoca una función y dentro de ella hay otra.
        //Se implementa el mapDispatchToProps.
        //props.dispatch(addExpense(expense));
        //Se agrega el prop que está enlazado con la nueva
        //funcion.
        this.props.startAddExpense(expense);
        //Lo provee router. Permite redireccionar cuando se suban los datos.
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

//Se agrega el mapDispatchToProps
//Se ponen las propiedades que invocarán a dispatch.
//Establece la invocación del dispatch, ahora accesible
//desde las props del componente.
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);