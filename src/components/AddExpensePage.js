import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

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
        this.props.onSubmit(expense);
        //Lo provee router. Permite redireccionar cuando se suban los datos.
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
            <h1>Add expense</h1>
            <ExpenseForm
                onSubmit={this.onSubmit}
            />
            </div>
        );
    }
}

//Se agrega el mapDispatchToProps
//Se ponen las propiedades que invocarán a dispatch.
//Establece la invocación del dispatch, ahora accesible
//desde las props del componente.
const mapDispatchToProps = (dispatch) => ({
    onSubmit: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);