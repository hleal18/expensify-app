import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//Se especifican las configuraciones del gestor de los tets
Enzyme.configure({
    adapter: new Adapter()
});
//Añade soporte a react v16 gracias al adaptador.