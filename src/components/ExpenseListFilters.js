import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import { sortByDate, sortByAmount } from '../actions/filters';

//Cuando se usa value en los elementos de html, con javascript se llama controlled input.
//es cuando se controla el input con código javascript. Expresión común que puede ser
//encontrada en documentación.
const ExpenseListFilters = (props) => (
    <div>
        <input
            type="text"
            value={props.filters.text}
            onChange={(e) => {
                props.dispatch(setTextFilter(e.target.value));
            }} 
        />
        <select onChange={(e) => {
            if(e.target.value === 'date') {
                props.dispatch(sortByDate());
            } else if (e.target.value === 'amount') {
                props.dispatch(sortByAmount());
            }
        }} >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);
