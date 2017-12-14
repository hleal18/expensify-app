//react-test-renderer (renderizar jsx a través de código sin necesidad de usar el navegador y evaluar que fue lo que se renderizó)
//El shallow solo se enfoca en renderizar el componente y evaluar lo renderizado.
import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const renderer = new ReactShallowRenderer();
    //Se tiene acceso a lo que renderiza a partir del componente.
    renderer.render(<Header />);
    //console.log(renderer.getRenderOutput());
    //No se pretende hacer assertions, sino snapshots.
    //Permiten rastrear los cambios de datos con el paso del tiempo 
    //(saber si el componente cambia lo que renderiza)
    //Si no existe un snapshot, siempre va a pasar la prueba.
    //Se crea un snapshot en ese estado de tiempo del componente.
    //Si luego se corre de nuevo (se ejecuta jest de nuevo)
    //, se comprueba si el snapshot sigue representando el mismo comportamiento.
    //Automáticamente se crea una carpeta _snapshots_ con información del snapshot generado.
    expect(renderer.getRenderOutput()).toMatchSnapshot();
    /**
     * Cuando se guarda el snapshot, se realiza una "copia" de lo que contiene el fichero
     * o los elementos que renderiza.
     * Cuando sucede un cambio en el fichero de origen y se corren las pruebas, se compara
     * con el snapshot guardado y se indican las incongruencias, los lugares donde difieren
     * y se informa el error. Si estos cambios que se hicieron no fueron un error, se puede
     * hacer un update al snapshot guardado presionando 'u' desde el cmd, y el nuevo estado
     * del componente se actualizará y será el nuevo snapshot usado para las pruebas.
     */
})
