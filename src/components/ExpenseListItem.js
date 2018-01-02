import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ description, id, amount, createdAt, dispatch }) => {
    return (
        <Link className="list-item" to={"/edit/" + id}>
            <div>
                <h3>{description}</h3>
                <span>{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>            
            <h3>{numeral(amount / 100).format('$0,0.00')}</h3>
        </Link>
    );
};

//Cuando no se necesita acceso al state y solo al dispatch, es suficiente no incluir el
//primer parámetro.
export default ExpenseListItem;
