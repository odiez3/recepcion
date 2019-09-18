import React, { Component } from 'react';
import Navigation from './navigation.cmpt';
import firebase from 'firebase';
import { USUARIO } from '../../dummys/user';
import './dashboard.css';
import M from 'materialize-css';

import RouterDashboard from '../../router/router-dashboard';

class Dashboard extends Component {

    state = {
        login: false
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.props.history.push("/");
            } else {
                this.setState({ login: true }, () => {
                    M.Modal.init(document.querySelectorAll('.modal'), { dismissible: false });
                });
            }
        });
    }

    render() {

        if (!this.state.login) {
            return <div></div>
        }
        return (
            <div className="dashContent">
                <Navigation history={this.props.history} usuario={USUARIO} />
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