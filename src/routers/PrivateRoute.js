//Se encarga de gestionar las rutas privadas.
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

export const PrivateRoute = ({ 
    isAutheticated, 
    component: Component,
    //Señala todos los demas campos que se 'destructuraron'
    ...rest
}) => (
        //Se le pasan las props que por defecto recibe:
        //path, component.
        <Route {...rest} component={(props) => (
            isAutheticated ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
        )} />
    );


const mapStateToProps = (state) => {
    //True si esta autenticado o false, si no lo esta.
    isAutheticated: !!state.auth.uid
};

export default connect(mapStateToProps)(PrivateRoute);