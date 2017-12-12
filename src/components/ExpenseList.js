import React from 'react';
import { connect } from 'react-redux';


const ExpenseList = (props) => (
    <div>
        <h1> Expense List </h1>
        {props.expenses.length}
    </div>
);

//Componente que se conecta con el store.
//El primer atributo, es una función que recibe el state de la app que
//se pretende usar dentro de la implementación de forma que se defina a que es lo
//que el componente tendrá acceso, en este caso, como ejemplo, se tiene acceso a name.
//El otro parámetro, es el componente al cual se le fusionará el campo del state solicitado
//en su propio campo de props, de forma que en la propia implementación del ExpenseList
//se tiene acceso a props.name que idealmente proviene del Store de redux al cual se
//accedió mediante el método connect.
const ConnectedExpenseList = connect((state) => {
    return {
        expenses: state.expenses
    };
})(ExpenseList);

export default ConnectedExpenseList;