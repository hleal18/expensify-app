import filtersReducer from '../../reducers/filters';
import moment from 'moment';

//Se usan valores internos de redux observables desde la herramienta de chrome
//@@INIT
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sort by to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sort by date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
})

test('should set text filter', () => {
    const text = 'good morning';
    const action = { type: 'SET_TEXT_FILTER', text };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
})

test('should set startDate filter', () => {
    const startDate = moment(moment().startOf('month')).add(4, 'days');
    const action = { type: 'SET_START_DATE', startDate };
   const state = filtersReducer(undefined, action);
   expect(state.startDate).toEqual(startDate);
});

test('should set endDate filter', () => {
    const endDate = moment(moment().endOf('month').subtract(4, 'days'));
    const action = { type: 'SET_END_DATE', endDate };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});