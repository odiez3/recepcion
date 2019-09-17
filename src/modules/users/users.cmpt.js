import React, { Component } from 'react';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
class Usuarios extends Component {

    componentDidMount() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
    }

    searchUser = (event) => {
        event.preventDefault();
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content black-text">
                                <span className="card-title">Buscar Usuario</span>
                                <form onSubmit={this.searchUser}>
                                    <div className="input-field">
                                        <input id="nombre" type="text" />
                                        <label htmlFor="nombre">Nombre</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="ci" type="text" />
                                        <label htmlFor="ci">CI</label>
                                    </div>

                                    <div className="center-align">
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Buscar<i className="material-icons right">search</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed-action-btn tooltipped" data-position="left" data-tooltip="Agregar Usuario">
                    <Link className="btn-floating btn-large red" to="/dashboard/userForm" >
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }
}


export default Usuarios;