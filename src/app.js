import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
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

const NotFoundPage = () => (
    <div>
        404! - <Link to="/">Go home</Link>
    </div>
);

//Ahora se usa NavLink.
//Ofrece:
//la identificación mediante una clase. ideal para aplicar estilos css.
//así como el link que coincide con la URL actual.
//hay que aplicar el mismo condicionamiento de Route, debido a que luego
//pone en negrita link que no está del todo activo.
const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
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