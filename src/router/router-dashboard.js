import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Usuarios from '../modules/users/users.cmpt';
import UsersForm from '../modules/users/users.form';

class RouterDashboard extends Component {
    render() {
        return (
                <Switch> 
                    <Route path="/dashboard/userForm/:id?" component={UsersForm} />
                    <Route path="/dashboard/users" component={Usuarios} />
                </Switch>
        )
    }
}

export default RouterDashboard;