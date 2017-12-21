import selectExpensesTotal from '../../selectors/expense-total';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should correctly add up multiple expenses', () => {
    expect(selectExpensesTotal(expenses)).toEqual(114195);
});

test('should correctly add up a single expense', () => {
    expect(selectExpensesTotal([expenses[0]])).toEqual(195);
});

test('should return 0 if no expenses', () =>{
    expect(selectExpensesTotal([])).toEqual(0);
});
