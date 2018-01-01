//Se encarga de gestionar las rutas privadas.
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({ 
    isAutheticated, 
    component: Component,
    //Señala todos los demas campos que no se 'destructuraron'
    ...rest
}) => (
        //Se le pasan las las props restantes al route.
        //Se especifica en el componente una funcion que retorn un componente.
        //La funcion es en realidad un stateless component.
        //Esta funcion evalua si esta o no autenticado.
        //Si lo está, renderiza el componente recibidor en las props de PrivateRoute.
        //Si no lo está, se usa Redirect para redirigirlo a la pagina de Login.
        <Route {...rest} component={(props) => (
            isAutheticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                    <Redirect to="/" />
                )
        )} />
    );


const mapStateToProps = (state) => ({
    //True si esta autenticado o false si no lo esta.
    isAutheticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);