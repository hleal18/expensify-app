import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import { setTimeout } from 'timers';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import getExpensesTotal from './selectors/expense-total';
import expenses from './tests/fixtures/expenses';
import { firebase } from './firebase/firebase';

const store = configureStore();

//Provider permite proveer el Store (donde se guardan los estados de la app)
//a todos los componentes React que conforman la app.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
//Sirve para evitar renderizar toda la app el doble de veces
//situación que se puede dar cuando se inicia o se cierra sesión.
let hasRendered = false;
const renderApp = () => {
    //Si no se ha renderizado, se renderiza.
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>loading...</p>, document.getElementById('app'));



//Se busca rastrear el proceso de cambio de autenticacion.
//Dependiendo del cambio, gracias al action de auth.js, se pueden
//realizar procedimientos cuando se inicicie o se cierre la sesión.
firebase.auth().onAuthStateChanged((user) => {
    //Si hay un user, inició sesión.
    if(user){
        //Se despacha el inicio de sesion modificar el redux store
        store.dispatch(login(user.uid));
        //Cuando se inicie sesión, se renderiza la app con los datos del user.
        store.dispatch(startSetExpenses()).then(() => {
            //Se renderiza la app.
            renderApp();
            //Como el onAuthStateChanged se ejecuta a cada rato (actualizar ventana), 
            //solo se redirige
            //al usuario al dashboard cuando este se encuentra en la LoginPage
            //que corresponde a '/'.
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } 
    //Si no hay, no no hay sesión iniciada.
    else {
        //Se despacha el cierre de la sesion para modificar el redux store.
        store.dispatch(logout());
        renderApp();
        //Cuando se cierre sesion se redirige a la LoginPage.
        history.push('/');
    }
})