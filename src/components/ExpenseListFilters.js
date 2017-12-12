import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

//Se encarga de que el input modifique el store y se actualice el filtro
//de forma que apenas se escriba o borre algo, la lista de items se actualice.
const ExpenseListFilters = (props) => (
    <div>
        <input type="text" value={props.filters.text} onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
        }} />
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);
