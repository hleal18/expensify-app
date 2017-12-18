import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

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

//Se evalua la cantidad de dinero ingresado se maneje correctamente en el componente.
test('should set amount on input change', () => {
    //Se pasa a string debido a que en el componente, así se manejan.
    const amount = 500.29.toString();
    //Se obtiene acceso a un componente que envuelve al ExpenseForm.
    //Se tiene acceso a funciones que facilitan la ejecución de test cases.
    const wrapper = shallow(<ExpenseForm />);
    //Se hace referencia al primer input que se encuentra en la página.
    //Se simula el evento change, que se da con la funcion onChange definida.
    //Se define el valor correspondiente a e.target.value, teniendo en cuenta
    //que por sí solo no se tiene acceso a 'e'.
    wrapper.find('input').at(1).simulate('change', {
        target: { value: amount }
    });
    expect(wrapper.state('amount')).toBe(amount);
});

//Se evalua cuando se introduce una cantidad no valida (que no cumpla con el formato)
//no se debe guardar ningun dato en el 'state' del componente.
test('should not set amount by invalid input change', () => {
    const amount = "345.2555";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: amount }
    });
    expect(wrapper.state('amount').length).toBe(0);
});

//Se procede a analizar las 'mock functions' o 'fake functions'
//Se quiere explorar que onSubmit se invoque con los correctos argumentos
//en su correcto formato.
//Para ello se usan los Spies.
test('should call onsubmit prop for valid form submission.', () => {
    // EJEMPLO BÁSICO.
    // Se guarda un spy que retorna jest.
    // const submitSpy = jest.fn();
    // Se encarga de invocar el spy y que pase el test.
    // submitSpy();
    // Detecta si el spy fue invocado.
    // expect(submitSpy).toHaveBeenCalled();
    // Se usa para evaluar si los parámetros con los cuales fué invocado, fueron los correctos.
    // submitSpy('Humberto', 'Colombia');
    // expect(submitSpy).toHaveBeenCalledWith('Humberto', 'Colombia');

    // Se crea el spy.
    const onSubmitSpy = jest.fn();
    // Se crea el wrapper con las props que se observan. Se pasa el spy como el onsubmit.
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    // Se simula el submit
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    // Se evalua el resultado esperado del error. Debe ser vacío.
    expect(wrapper.state('error')).toBe('');
    // Se evalua que la ultima vez que fue invocado el spy, fue con los argumentos que se ven.
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

//Se busca evaluar el cambio de fecha en el componente SingleDatePicker
//Que se invoque correctamente y que se refleje en el state.
test('should set new date on date change', () => {
    const now = moment();
    //Se obtiene el componente.
    const wrapper = shallow(<ExpenseForm />);
    //Se usa la función props para obtener las propiedades. O prop.
    //Se obtiene devuelta la función que se invoca.
    //Se le pasa una instancia de moment, debido a que eso es lo que recibe.
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

//Se evalua de que onFocusChange, modifique correctamente el state
test('should set new focus change on SingleDatePicker', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual(focused);
});