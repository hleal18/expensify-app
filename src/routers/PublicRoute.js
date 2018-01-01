//Se encarga de especificar routas publicas accesibles solamente cuando
//no se esta autenticado.
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//Uno de los objetivos de este componente es evitar que cuando haya
//un usuario identificado, el mismo se dirija a la página de login,
//lo cual no es lógico.

export const PublicRoute = ({
    //Se renombra component a Component
    component: Component,
    //Se obtiene el isAuthenticated gracias al mapStateToProps
    isAuthenticated,
    //El resto de propiedades que no se destructuran
    ...rest
}) => (
        //Se retorna el componente Route, especificando el componente al que
        //hará referencia.
        <Route {...rest}
            //El atributo component recibe un stateless component.
            component={
                //El componente es invocado con las props
                (props) => (
                    //Se evalua si esta autenticado.
                    isAuthenticated ? (
                        //Si lo está, se redirige al dashboard.
                        <Redirect to='/dashboard' />
                    ) : (
                            //Si no está autenticado, permite que el componente se
                            //renderice.
                            <Component {...props} />
                        )
                )} />
    );

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
