import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

//Se especifican las configuraciones del gestor de los tets
Enzyme.configure({
    adapter: new Adapter()
});
//Añade soporte a react v16 gracias al adaptador.

//Sirve para configurar correctamente las variables de ambiente cuando 
//se ejecuta el proyecto modo de pruebas.
DotEnv.config({ path: '.env.test' });