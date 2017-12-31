import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let wrapper, startLogin;

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(<LoginPage startLogin={startLogin}/>)
});

//Evalua que el LoginPage se renderice correctamente 
//con respecto al snapshot guardado
test('should render correctly the LoginPage component', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should call startLogin on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});