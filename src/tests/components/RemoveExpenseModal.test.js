import React from 'react';
import { shallow } from 'enzyme';
import RemoveExpenseModal from '../../components/RemoveExpenseModal';

let wrapper, onAction, onRequestClose, showModal;

beforeEach(() => {
    onAction = jest.fn();
    onRequestClose = jest.fn();
    showModal = true;
    wrapper = shallow(<RemoveExpenseModal
        onAction={onAction}
        onCloseModal={onRequestClose}
        showModal={showModal}
    />);
});

//Evalua que se renderice correctamente
test('should render RemoveExpenseModal correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//Evalua que se accione correctamente la funcion
//onAcceptActionHandler con el evento click del boton
//y en consecuencia, la invocacion de prop.onAction()
test('should test the click event and the invocation of the onAction prop', () => {
    wrapper.find('button').simulate('click');
    expect(onAction).toHaveBeenCalledWith();
});

//Evalua que el modal invoque el método que se encarga
//del cierre del mismo.
test('should invoke the onRquestClose method', () => {
    wrapper.find('Modal').prop('onRequestClose')();
    expect(onRequestClose).toHaveBeenCalledWith();
});