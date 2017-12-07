import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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

//Se crea un componente que se renderiza cuando haya una ruta inexistente
//Se usa en conjunto con Switch, otro componente importado.
const NotFoundPage = () => {
    return (<div>404!</div>);
};

//Switch sirve para chequear el path y si coincide, lo ejecuta.
//Por otro lado si ninguno coincide, por defecto ejecuta el último.
//Que en este caso siempre se ejcutará ya que no tiene un path predefinido.
const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/>
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));