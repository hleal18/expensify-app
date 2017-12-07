import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


//Cada Route significa un página.
//Si se quieren tres páginas, hay que hacer tres Routes.
const ExpenseDashboardPage = () => (
    <div>
        This is from my dashboard component
    </div>
);

const AddExpensePage = () => (
    <div>
        This is from my add expense component
    </div>
);

const EditExpensePage = () => (
    <div>
        This is from my edit expense page component.
    </div>
);

const HelpPage = () => (
    <div>
        This is from my help page component.
    </div>
);

//Se usan evenlisteners para sobreescribir el comportamiento por defecto
//del navegador al realizar petición al servidor cuando se clickea un link
//que está contemplado en el código del Routing del lado del cliente.
//para ello se usa el componente Link con sus propiedades.
const NotFoundPage = () => (
    <div>
        404! - <Link to="/">Go home</Link>
    </div>
);

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <div>
        <Link to="/">Go to Home Page.</Link>
        </div>
        <div>
        <Link to="/create">Go to create expense page.</Link>
        </div>
        <div>
        <Link to="/edit">Go to edit page.</Link>
        </div>
        <div>
        <Link to="/help">Go to help page.</Link>
        </div>
    </header>
);

const routes = (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>

    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));