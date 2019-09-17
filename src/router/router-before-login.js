import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../modules/login/login.cmpt';
import Dashboard from '../modules/dashboard/dashboard.cmpt';

class RouterBeforeLogin extends Component {
    render() {
        return (

            <BrowserRouter>
                <Switch> 
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterBeforeLogin;