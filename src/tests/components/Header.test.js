import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '../../components/Header';

let wrapper, startLogout

beforeEach(() => {
    startLogout = jest.fn();
    wrapper = shallow(<Header startLogout={startLogout}/>);
});

//Compara el componente renderizado con el guardado en el snapshot.
test('should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

//Evalua que el boton de cerrar sesion se invoque correctamente con
//respecto al evento de click del boton.
test('should call startLogout on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})
