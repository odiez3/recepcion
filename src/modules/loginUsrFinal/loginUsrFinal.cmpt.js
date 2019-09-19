import React, { Component } from 'react';
import firebase from 'firebase';
import { ERROR_CODES, GENERIC_ERROR } from '../../properties/properties';
import './loginUsrFinal.css';
import M from 'materialize-css';
import {checkCedula} from './loginUsrFinal.code';
import $ from 'jquery';

class LoginUsrFinal extends Component {

    state = {
        cedula: "",
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push("/dashboard",{cedula:this.state.cedula});
            }
        });
    }

    login = () => {
        firebase.auth().signInAnonymously().then((rs)=>{           
        }).catch((erro)=>{
        });
    }

    changeValues = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value });
    }

    submitValue = (event) => {
        event.preventDefault();
        //Verifica que exista.
        checkCedula(this.state.cedula).then((rs)=>{
            if(rs){
                this.login();
            }
        })

    }

    render() {

        let title = this.state.olvidePass ? "Recuperar Contraseña" : this.state.registro ? "Registro" : "Iniciar Sesión";
        return (
            <div className="container-fluid">
                <div className="login valign-wrapper">
                    <div className="row">
                        <div className="col s12">
                            <div className="card  darken-1">
                                <div className="card-content ">
                                    <span className="card-title">{title}</span>
                                    <form className="formLogin" onSubmit={this.submitValue}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="cedula" type="text" onChange={this.changeValues} value={this.state.cedula} />
                                                <label htmlFor="cedula">Cédula:</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12 right-align">
                                                <button className="btn waves-effect waves-light" type="submit" name="action">
                                                   Entrar
                                                    <i className="material-icons right">send</i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-action">
                                    <a href="/registroUsr" id="sesionLink" >Registrarme</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}

export default LoginUsrFinal;