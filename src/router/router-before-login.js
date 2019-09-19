import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../modules/login/login.cmpt';
import Dashboard from '../modules/dashboard/dashboard.cmpt';

import LoginUsrFinal from '../modules/loginUsrFinal/loginUsrFinal.cmpt';
import Confirmacion from '../modules/confirmacion/confirmacion';

class RouterBeforeLogin extends Component {
    render() {
        return (

            <BrowserRouter>
                <Switch> 
                    <Route path="/confirmacion" component={Confirmacion} />
                    <Route path="/admin" component={Login} />
                    <Route path="/registro" component={Login}   />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/" component={LoginUsrFinal} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterBeforeLogin;