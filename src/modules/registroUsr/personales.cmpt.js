import React, { Component } from 'react';
import firebase from 'firebase';
import * as shortID from 'shortid';
import { checkCedula } from '../users/users.code';
import M from 'materialize-css';


class DatosPersonales extends Component {

    state = {
        nombre: "",
        apellidos: "",
        perfil: "2",
        correo: "",
        telefono: "",
        cedula: "",
    }

    async componentWillMount() {
        if(this.props.datos){
            this.setState(this.props.datos);
        }else{
            let cedula = shortID.generate().replace("-", "0").replace("_", "1").toUpperCase();
            let existsCedula = false;
            existsCedula = await checkCedula(cedula);
            while (existsCedula.error) {
                cedula = shortID.generate().replace("-", "0").replace("_", "1").toUpperCase();
                existsCedula = await checkCedula(cedula);
            }
    
            this.setState({ cedula });
        }
      
    }

    componentDidMount(){
        M.updateTextFields();
    }
    onChangeValues = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value });
    }
    submitForm = (event) => {
        event.preventDefault();
        let { perfil, nombre, apellidos, correo, telefono, cedula } = this.state;
        let valido = true;
        if (nombre.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese su nombre.", classes: 'red darken-1' });
        }

        if (apellidos.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese sus apellidos.", classes: 'red darken-1' });
        }

        if (correo.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese un correo válido.", classes: 'red darken-1' });
        }

        if (telefono.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese un Teléfono válido.", classes: 'red darken-1' });
        }

        if(valido){
            this.props.setDatosPersonales({ perfil, nombre, apellidos, correo, telefono, cedula });
        }
    }

    render() {
        if (!this.state.cedula) {
            return (<div></div>)
        }
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content black-text">
                            <span className="card-title">Llena todos los campos con tus datos.</span>
                            <form onSubmit={this.submitForm} >
                                <div className="input-field">
                                    <input id="nombre" type="text" onChange={this.onChangeValues} value={this.state.nombre} />
                                    <label htmlFor="nombres">Nombres</label>
                                </div>
                                <div className="input-field">
                                    <input id="apellidos" type="text" onChange={this.onChangeValues} value={this.state.apellidos} />
                                    <label htmlFor="apellidos">Apellidos</label>
                                </div>
                                <div className="input-field">
                                    <input id="correo" type="text" onChange={this.onChangeValues} value={this.state.correo} maxLength="50" />
                                    <label htmlFor="correo">Correo Electrónico</label>
                                </div>
                                <div className="input-field">
                                    <input id="telefono" type="text" onChange={this.onChangeValues} value={this.state.telefono} maxLength="10" />
                                    <label htmlFor="telefono">Teléfono</label>
                                </div>
                                <div className="center-align">
                                        <button className="waves-effect waves-light btn mr-1 green darken-3" type="submit">Continuar</button>
                                        <button className="waves-effect waves-light btn red darken-3" type="button"
                                            onClick={
                                                () => {
                                                    firebase.auth().signOut();
                                                    this.props.history.push("/");
                                                }
                                            }
                                        >Cancelar</button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default DatosPersonales;