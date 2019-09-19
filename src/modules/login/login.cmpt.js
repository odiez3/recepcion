import React, { Component } from 'react';
import firebase from 'firebase';
import { ERROR_CODES, GENERIC_ERROR } from '../../properties/properties';
import './login.css';
import M from 'materialize-css';
import { isAdmin, addAdmin,forgotPassword } from './login.code';
import $ from 'jquery';

class Login extends Component {

    state = {
        correo: "",
        password: "",
        registro: false,
        olvidePass: false
    }

    componentWillMount() {

        if (this.props.location && this.props.location.pathname === "/registro") {
            this.setState({ registro: true });
        }

        if (this.props.location && this.props.location.pathname === "/olvidePass") {
            this.setState({ olvidePass: true, registro: false });
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push("/dashboard");
            }
        });
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.correo, this.state.password).then((user) => {
            this.props.history.push("/dashboard");
        }).catch((error) => {
            if (ERROR_CODES[error.code]) {
                M.toast({ html: ERROR_CODES[error.code], classes: 'red darken-1' });
            } else {
                M.toast({ html: GENERIC_ERROR, classes: 'red darken-1' });
            }
        });
    }

    changeValues = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value });
    }

    submitValue = (event) => {
        event.preventDefault();
        //Verifica que sea un administrador ya registrado
        isAdmin(this.state.correo).then((rs) => {
            if (rs) {
                if(this.state.olvidePass){
                    forgotPassword(this.state.correo).then((rs)=>{
                        debugger;
                        if(rs){
                            setTimeout(
                                $("#sesionLink").click()
                            ,2000);
                        }
                    });
                }else{
                    if (this.state.registro && this.state.correo.trim() !== "") {
                        addAdmin(this.state.correo, this.state.password);
                    } else {
                        this.login();
                    }
                }
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
                                                <input id="correo" type="text" onChange={this.changeValues} value={this.state.correo} />
                                                <label htmlFor="correo">Correo:</label>
                                            </div>
                                            {
                                                !this.state.olvidePass ?
                                                    <div className="input-field col s12">
                                                        <input id="password" type="password" onChange={this.changeValues} value={this.state.password} />
                                                        <label htmlFor="password">Contraseña:</label>
                                                    </div>
                                                    : null
                                            }

                                        </div>
                                        {
                                            !this.state.registro && !this.state.olvidePass ?
                                                <div className="row">
                                                    <div className="col s12 center-align">
                                                        <a href="/olvidePass">Olvide mi contraseña</a>
                                                    </div>
                                                </div>
                                                : null
                                        }

                                        <div className="row">
                                            <div className="col s12 right-align">
                                                <button className="btn waves-effect waves-light" type="submit" name="action">
                                                    {
                                                        !this.state.registro && !this.state.olvidePass ? "Entrar" :
                                                            this.state.olvidePass ? "Recuperar" :
                                                                "Enviar"
                                                    }
                                                    <i className="material-icons right">send</i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="card-action">
                                    {
                                        this.state.registro || this.state.olvidePass ?
                                            <a href="/" id="sesionLink" >Iniciar Sesión</a>
                                            :
                                            <a href="/registro" >Sin registro ? Hazlo aquí</a>
                                    }

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