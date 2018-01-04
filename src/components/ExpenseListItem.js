import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ description, id, amount, createdAt, dispatch, message }) => {
    return (
        <div>
            <Link className={("list-item " + (message !== 'Saved expense' ? "availability--false" : ""))} to={"/edit/" + id}>
                <div>
                    <h3 className="list-item__title">{description}</h3>
                    <span className="list-item__subtitle">{moment(createdAt).format('MMMM Do, YYYY')}</span>
                </div>
                <div className="list-item__right">
                    <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
                    <span className="list-item__subtitle">{message}</span>
                </div>
            </Link>
        </div>
    );
};

//Cuando no se necesita acceso al state y solo al dispatch, es suficiente no incluir el
//primer parámetro.
export default ExpenseListItem;
