import React, { Component } from 'react';
import firebase from 'firebase';
import {ERROR_CODES,GENERIC_ERROR} from '../../properties/properties';
import './login.css';
import M from 'materialize-css';

class Login extends Component {

    state = {
        correo: "",
        password: ""
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.history.push("/dashboard");
            }
        });
    }

    login = ()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.correo,this.state.password).then((user)=>{
            this.props.history.push("/dashboard");
        }).catch((error)=>{
            if(ERROR_CODES[error.code]){
                M.toast({html: ERROR_CODES[error.code],classes:'red darken-1'});
            }else{
                M.toast({html: GENERIC_ERROR,classes:'red darken-1'});
            }
        });
    }

    changeValues = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value });
    }

    submitValue = (event) => {
        event.preventDefault();
        this.login();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="login valign-wrapper">
                    <div className="row">
                        <div className="col s12">
                            <div className="card  darken-1">
                                <div className="card-content ">
                                    <span className="card-title">Iniciar Sesión</span>
                                    <form className="formLogin" onSubmit={this.submitValue}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="correo" type="text" onChange={this.changeValues} value={this.state.correo} />
                                                <label htmlFor="correo">Correo:</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input id="password" type="password" onChange={this.changeValues} value={this.state.password} />
                                                <label htmlFor="password">Contraseña:</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12 right-align">
                                                <button className="btn waves-effect waves-light" type="submit" name="action">Entrar<i className="material-icons right">send</i></button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="card-action">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}

export default Login;