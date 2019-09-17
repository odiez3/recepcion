import React, { Component } from 'react';
import { PERFILES } from '../../properties/properties';
import M from 'materialize-css';

class UsersForm extends Component {

    state = {
        title: "Agregar Usuario"
    }

    componentDidMount(){
      M.FormSelect.init(document.querySelectorAll('select'), {});
    }

    submitForm = (event) => {
        event.preventDefault();

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content black-text">
                                <span className="card-title">{this.state.title}</span>
                                <form onSubmit={this.submitForm}>
                                    <div className="input-field">
                                        <input id="nombre" type="text" />
                                        <label htmlFor="nombres">Nombres</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="apellidos" type="text" />
                                        <label htmlFor="apellidos">Apellidos</label>
                                    </div>
                                    <div className="input-field">
                                        <select>
                                            <option value="" disabled selected>Selecciona una Opción</option>
                                            {
                                                Object.keys(PERFILES).map((value,index)=>{
                                                   let desc = PERFILES[value];
                                                    return(
                                                        <option value={value} key={value}>{desc}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Perfil</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="correo" type="text" />
                                        <label htmlFor="correo">Correo</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="telefono" type="text" />
                                        <label htmlFor="telefono">Teléfono</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UsersForm;