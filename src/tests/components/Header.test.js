import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    //Para que enzyme funcione correctamente mediante un snapshot se instala
    //enzyme-to-json@3.0.1
    //Si no se usa, el snapshot generado muestra código interno de Enzyme
    //lo que dificulta la detección de errores.
    //Se puede realizar la configuración para que no haya que llamar explícitamente
    //la función toJSON que se acaba de importar.
    //en jest.config.json
    expect(wrapper).toMatchSnapshot();
    //Se observan unas funcionalidades a las que se tienen acceso.
    //expect(wrapper.find('h1').text()).toBe('Expensify');
});
