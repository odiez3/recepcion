import React, { Component } from 'react';
import './confirmacion.css';
import firebase from 'firebase';
import espera from './espera.jpg';
class Confirmacion extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="confirmacion valign-wrapper">
                    <div className="row">
                        <div className="col s12">
                            <div className="card ">
                                <div className="card-content ">
                                    <span className="card-title">Solicitud Enviada</span>
                                    <p>
                                        Tu solicitud ha sido enviada y esta pediente de respuesta,
                                        dirígete a la zona de espera.
                                    </p>
                                    <p>Recibiras una notificación cuando te respondan.</p>
                                    <br/>
                                    <div className="row center-align">
                                        <img src={espera} className="responsive-img" />
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

export default Confirmacion;