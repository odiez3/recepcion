import React, { Component } from 'react';

class ConfirmaDatos extends Component {

    state = {
        nombre: "",
        apellidos: "",
        perfil: "",
        correo: "",
        telefono: "",
        cedula: "",
        preview: false,
        fileToUpload: false,
    }

    componentWillMount() {
        debugger
        if (this.props.imagenPerfil) {
            let { preview, fileToUpload } = this.props.imagenPerfil;
            this.setState({ preview, fileToUpload });
        } else {
            this.props.cambiaImagen();
        }
        if (this.props.personales) {
            let { nombre, apellidos, perfil, correo, telefono, cedula } = this.props.personales;
            this.setState({ nombre, apellidos, perfil, correo, telefono, cedula });
        } else {
            this.props.cambiaDatos();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content black-text">
                                <span className="card-title">Confirma tus datos</span>
                                <div className="divider mt-1"></div>
                                <div className="left-align ">
                                    <h5>Imagen de Perfil</h5>
                                </div>
                                <div className="divider"></div>
                                <div className="center-align mt-1">
                                    <img src={this.state.preview} alt="" className="responsive-img z-depth-5" />
                                </div>
                                <div className="center-align">
                                    <button className="waves-effect waves-light btn light-blue darken-1" type="button"
                                        onClick={() => {
                                            this.props.cambiaImagen();
                                        }}
                                    ><i className="material-icons left">camera_alt</i>Cambiar</button>
                                </div>
                                <div className="divider mt-1"></div>
                                <div className="left-align mt-1">
                                    <h5>Datos Personales</h5>
                                </div>
                                <div className="divider"></div>
                                <div className="left-align ">
                                    <p>Nombre: {this.state.nombre} {this.state.apellidos}</p>
                                </div>
                                <div className="left-align">
                                    <p>Correo electrónico: {this.state.correo}</p>
                                </div>

                                <div className="left-align">
                                    <p>Teléfono: {this.state.telefono}</p>
                                </div>
                                <div className="center-align mt-1">
                                    <button className="waves-effect waves-light btn light-blue darken-1" type="button"
                                        onClick={() => {
                                            this.props.cambiaDatos();
                                        }}
                                    ><i className="material-icons left">edit</i>Corregir</button>
                                </div>

                                <div className="center-align mt-1">
                                    <button className="waves-effect waves-light btn mr-1 green darken-3" type="submit">Aceptar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default ConfirmaDatos;