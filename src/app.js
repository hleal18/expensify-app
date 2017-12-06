import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
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

//La propiedad exact de Router, permite que la renderización de los componentes
//de acuerdo a la URL que se tenga, sea exactamente la que se tenga introducida,
//debido a que si no se tiene esa propiedad, todas las coincidencias desde / hasta
// ...cualquier nombre, pueden renderizarse al coincidir en parte con la ruta.
const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));