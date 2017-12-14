import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, id, amount, createdAt, dispatch }) => {
    return (
        <div>
            <Link to={"/edit/" + id}>
                <h3>{description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>            
        </div>
    );
};

//Cuando no se necesita acceso al state y solo al dispatch, es suficiente no incluir el
//primer parámetro.
export default ExpenseListItem;
