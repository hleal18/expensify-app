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

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    //Debido a que da error al tener la propiedad de preventDefaultBehavior
    //En los test cases, el objeto e se pasa como undefined, para ello
    //Se le pasa como prametro un objeto que representa el evento con
    //la función que presenta problemas.
    //Principalmente se hace para evitar el error.
    //Se simula el submit y por tanto la propiedad error queda guardada
    //en el state del component.
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    //Se comprueba que se haya obtenid un error, que era lo esperado.
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    //Tambien se comprueba que la renderización, se haga correctamente.
    expect(wrapper).toMatchSnapshot();
});

//Cambio de descripción.
test('should set description on input change', () => {
    const description = 'New description value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { target: { value: description } });
    expect(wrapper.state('description').length).toBeGreaterThan(0);
});

//Cambio de note.
test('should set note on input change', () => {
    const note = 'New note value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change', { target: { value: note } });
    expect(wrapper.state('note')).toBe(note);
});

test('should set amount on input change', () => {
    const amount = 500.29.toString(); 
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: amount }
    });
    expect(wrapper.state('amount')).toBe(amount);
});

test('should not set amount by invalid input change', () => {
    const amount = "345.2555";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: amount }
    });
    expect(wrapper.state('amount').length).toBe(0);
});