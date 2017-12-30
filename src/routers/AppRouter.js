import React, { Children } from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

//Se muestra la herramienta para hacer url dinámicas por medio del 
//Route
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Route path="/:something" component={Header}/>     
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />                
                <Route path="/create" component={AddExpensePage} />                
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route path="/dashboard" component={ExpenseDashboardPage}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;