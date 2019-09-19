import React, { Component } from 'react';
import firebase from 'firebase';
import M from 'materialize-css';
import { getUser,creaSolicitud } from './users.code';
import { closeModal, openModal } from '../dashboard/dashboard.code';


class UserRead extends Component {

    state = {
        cedulaVisitante: false,
        userAVisitar: false
    }

    async componentWillMount() {
        debugger;
        openModal();
        if (this.props.match && this.props.match.params) {
            let { cedula, cedulaVisitante } = this.props.match.params;
            debugger;
            console.log(cedula, cedulaVisitante);
            this.setState({ cedulaVisitante });
            //Verifica que existan ambas cedulas
            let userVisitante = await getUser(cedulaVisitante);

            if (userVisitante && userVisitante.user) {
                let userAVisitar = await getUser(cedula);

                if (userAVisitar && userAVisitar.user) {
                    this.setState({ userAVisitar: userAVisitar.user }, () => {
                        closeModal();
                    });
                } else {
                    this.props.history.push("/dashboard", { cedula: cedulaVisitante });
                }
            } else {
                M.toast({ html: "Sin autorización.", classes: 'red darken-1' });
                firebase.auth().signOut().then(() => {
                    this.props.history.push("/visitante");
                })
            }
        } else {
            firebase.auth().signOut().then(() => {
                this.props.history.push("/visitante");
            })
        }
    }

    enviarSolicitud =(event)=>{
        openModal();
        creaSolicitud(this.state.userAVisitar.cedula,this.state.cedulaVisitante).then((rs)=>{
            if(rs){
                closeModal();
            
                this.props.history.push('/confirmacion');
               
            }
            closeModal();
        })
    }

    render() {
        if (!this.state.userAVisitar) {
            return <div></div>
        }

        let { nombre, apellidos, correo, telefono, preview, area, cargo } = this.state.userAVisitar;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 left-align mt-1">
                        <label onClick={
                            () => {
                                this.props.history.push('/dashboard/buscarEmpleado', { cedula: this.state.cedulaVisitante });
                            }
                        } className="back">
                            <i className="material-icons  left"

                            >arrow_back</i> Buscar Empleado</label>
                    </div>

                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="row hide-on-small-only">
                            <div className="col s12 viewEmpleado">
                                <div className="card horizontal">
                                    <div className="card-image">
                                        <img src={preview} />
                                    </div>
                                    <div className="card-stacked">
                                        <div className="card-content formUser">
                                            <p className="nombreEmpleado">{`${nombre} ${apellidos}`}</p>
                                            {
                                                area ?
                                                    <p>Área: {area}</p>
                                                    : null
                                            }
                                            {
                                                cargo ?
                                                    <p>Cargo: {cargo}</p>
                                                    : null
                                            }
                                        </div>
                                        <div className="card-action">
                                        <div onClick={this.enviarSolicitud} className="back">Enviar Solicitud</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row hide-on-med-and-up show-on-small">
                            <div className="col s12 viewEmpleado">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={preview} />
                                    </div>

                                    <div className="card-content formUser">
                                        <p className="nombreEmpleado">{`${nombre} ${apellidos}`}</p>
                                        {
                                            area ?
                                                <p>Área: {area}</p>
                                                : null
                                        }
                                        {
                                            cargo ?
                                                <p>Cargo: {cargo}</p>
                                                : null
                                        }
                                    </div>
                                    <div className="card-action">
                                        <div onClick={this.enviarSolicitud} className="back">Enviar Solicitud</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserRead;
