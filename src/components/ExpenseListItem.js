import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ description, id, amount, createdAt, dispatch }) => {
    const handlerRemoveExpense = () => {
        const retorno = dispatch(removeExpense({ id }));
    };
    return (
        <div>
            <h3>{description}</h3>
            <p>{amount} - {createdAt}</p>
            <button onClick={() => dispatch(removeExpense({id}))}> Remove </button>
        </div>
    );
};

//Cuando no se necesita acceso al state y solo al dispatch, es suficiente no incluir el
//primer parámetro.
export default connect()(ExpenseListItem);
