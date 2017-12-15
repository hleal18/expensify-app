import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    //Al usar snapshot, se encuentra que no se puede
    //Debido a que la fecha asignada es cuando se corre el jest
    //por lo cual la fecha va a cambiar y dará como resultado
    //un error en las pruebas.
    //Se busca usar mock libraries qe permiten usar
    //datos falsos, útil para este tipo de situaciones.
    //La documentación de jest explica la adición de mocks.
    //Se busca que los mocks se ejecuten exclusivamente al realizar
    //las pruebas, en la aplicación real, todo funcionará correctamente.
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>);
    expect(wrapper).toMatchSnapshot();
});