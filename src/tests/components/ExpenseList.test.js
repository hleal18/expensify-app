import React from 'react';
import { ExpenseList } from '../../components/ExpenseList';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
    //Si el componente cambia, se notifica al no pasar la prueba.
    //tener en cuenta si hay condicionalidad de datos disponibles al momento
    //de realizar el renderizado.
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
})

