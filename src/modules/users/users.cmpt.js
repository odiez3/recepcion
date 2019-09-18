import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { getUser,searchByName } from './users.code';

class Usuarios extends Component {

    state = {
        nombre: "",
        cedula: "",
        users: []
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
    }

    onChangeValues = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value });
    }

    searchUser = (event) => {
        event.preventDefault();
        let { cedula, nombre, users } = this.state;
        users = [];
        if (cedula.trim() !== "") {
            getUser(cedula).then((rs) => {
                if (rs && rs.user) {
                    users.push(rs.user);
                    this.setState({ users });
                }
            });
        } else if (nombre.trim() !== "") {
            searchByName(nombre).then((rs)=>{
                if(rs){
                    this.setState({users:rs});
                }
            });
        } else {
            M.toast({ html: 'Ingresa el nombre o la cédula.', classes: 'red darken-1' });
        }
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
                                        <input id="nombre" type="text" onChange={this.onChangeValues} value={this.state.nombre}/>
                                        <label htmlFor="nombre">Nombre</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="cedula" type="text" onChange={this.onChangeValues} value={this.state.cedula} />
                                        <label htmlFor="ci">Cédula</label>
                                    </div>

                                    <div className="center-align">
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Buscar<i className="material-icons right">search</i>
                                        </button>
                                    </div>
                                </form>
                                {
                                    this.state.users.length ?
                                        <React.Fragment>
                                            <br/>
                                            <div className="divider"></div>
                                            <ul className="collection">
                                                {
                                                    this.state.users.map((value, index) => {
                                                        return (<li className="collection-item avatar">
                                                            <img src={value.preview} alt="" className="circle" />
                                                            <p className="truncate">{`${value.nombre} ${value.apellidos}`}</p>
                                                            <p><Link to={`/dashboard/userForm/${value.cedula}`}>{value.cedula}</Link></p>
                                                            <Link to={`/dashboard/userForm/${value.cedula}`} className="secondary-content"><i className="material-icons">remove_red_eye</i></Link>
                                                        </li>)
                                                    })
                                                }
                                            </ul>

                                        </React.Fragment>
                                        : null
                                }
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