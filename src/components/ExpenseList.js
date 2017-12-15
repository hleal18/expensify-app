import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => (<ExpenseListItem {...expense} key={expense.id} />))
            )
        }        
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
//Se define el mapStateToProps, que permite mezclar el el campo específico del estado
//con los props del componente que posteriormente se manipula.
//Cada vez que el state cambia, la función de este componente, mapStateToProps es ejecutada.
//ocasionando un re-renderizado.
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

//El segundo parámetro se entiene como el parámetro de una función más interna.
//Se retorna un HOC conectado con el state.
//El primer parámetro ocasiona que se suscriba al Store, estando así al asecho de los cambios
//que sucedan para así ejecutarse.
export default connect(mapStateToProps)(ExpenseList);