import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    //Se pueden manipular las propiedades de un componente.
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

//SE EVALUAN CADA UNA DE LAS FUNCIONES QUE LLEVA A CABO EL COMPONENTE.
test('should handle text change', () => {
    const textInput = 'cuotas';
    wrapper.find('input').simulate('change', { target: { value: altFilters.text }});
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
});

test('should sort by date', () => {
    wrapper.find('select').simulate('change', { target: { value: filters.sortBy }});
    expect(sortByDate).toHaveBeenCalled();
})

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', { target: { value: altFilters.sortBy }});
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate: altFilters.startDate, endDate: altFilters.endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);
});

test('should handle data changes', () => {
    const calendarFocused = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});