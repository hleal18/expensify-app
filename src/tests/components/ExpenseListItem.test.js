import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render the ExpenseListItem file', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});