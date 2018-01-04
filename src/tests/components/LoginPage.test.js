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

//Evalua que el metodo startLogin se invoque para el login con google.
test('should call startLogin on button click with google mehod', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(startLogin).toHaveBeenLastCalledWith('google');
});

//Evalua que el metodo startLogin se invoque para el login con github
test('should call startLogin on button click with github method', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(startLogin).toHaveBeenLastCalledWith('github');
})