import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Usuarios from '../modules/users/users.cmpt';
import UsersForm from '../modules/users/users.form';

import UserRead from '../modules/users/user.read.cmpt';
 
class RouterDashboard extends Component {
    render() {
        return (
                <Switch> 
                    <Route path="/dashboard/info/:cedula/:cedulaVisitante" component={UserRead} />
                    <Route path="/dashboard/buscarEmpleado" component={Usuarios} />
                    <Route path="/dashboard/userForm/:cedula?" component={UsersForm} />
                    <Route path="/dashboard/users" component={Usuarios} />
                </Switch>
        )
    }
}

export default RouterDashboard;