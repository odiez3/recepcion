import React, { Component } from 'react';
import Navigation from './navigation.cmpt';
import firebase from 'firebase';
import { getUserCorreo } from './dashboard.code';
import {getUser} from '../users/users.code';
import { USUARIO } from '../../dummys/user';
import './dashboard.css';
import M from 'materialize-css';

import RouterDashboard from '../../router/router-dashboard';

class Dashboard extends Component {

    state = {
        login: false,
        user: false
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                this.props.history.push("/");
            } else {
              
                if (user.isAnonymous) {
                    console.log(this.props);
                    if(this.props.location && this.props.location.state && this.props.location.state.cedula && this.props.location.state.cedula.trim() !== ""){
                        let usr = await getUser(this.props.location.state.cedula);
                        if(usr){
                            this.setState({ login: true, user: usr.user }, () => {
                                M.Modal.init(document.querySelectorAll('.modal'), { dismissible: false });
                                this.props.history.push('/dashboard/buscarEmpleado',{cedula:usr.user.cedula});
                            });
                        }else{  
                            firebase.auth().signOut();
                        }
                    }else{
                        firebase.auth().signOut();
                    }
                } else {
                    let usr = await getUserCorreo(user.email);
                    if (usr) {
                        console.log(usr.user);
                        this.setState({ login: true, user: usr.user }, () => {
                            M.Modal.init(document.querySelectorAll('.modal'), { dismissible: false });
                        });
                    }
                }

            }
        });
    }

    render() {

        if (!this.state.login) {
            return <div></div>
        }
        return (
            <div className="dashContent">
                <Navigation history={this.props.history} usuario={this.state.user} />
                <RouterDashboard />
                <div id="modal1" className="modal bottom-sheet">
                    <div className="modal-content center-align">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            Cargando...
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;