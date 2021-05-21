import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Notas from './Notas';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/notas/:id" component={Notas} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));