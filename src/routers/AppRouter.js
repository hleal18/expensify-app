import React, { Children } from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
//Permite la creación del history sin necesidad del react-router.
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
//Se van a agregar componentes que permitan gestionar las rutas privadas.
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

//Este history se le pasará al cambiado de 
//BrowserRouter -> Router, lo que permite que se manipule manualmente el
//history.
//Se puede exportar y acceder desde fuera del archivo.
export const history = createHistory();

//Se muestra la herramienta para hacer url dinámicas por medio del 
//Route
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
                <PrivateRoute path="/create" component={AddExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>                
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;