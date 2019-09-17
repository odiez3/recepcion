import React, { Component } from 'react';
import { PERFILES, DEFAULT_PROFILE } from '../../properties/properties';
import M from 'materialize-css';
import './users.css';
import * as shortID from 'shortid';
import { checkCedula,changeNameFile } from './users.code';
import $ from 'jquery';

class UsersForm extends Component {

    state = {
        title: "Agregar Usuario",
        nombre: "",
        apellidos: "",
        perfil: "",
        correo: "",
        telefono: "",
        cedula: "",
        password:"",
        preview:false,
        fileToUpload:false
    }

    onChangeValues = (event) => {
        let { id, value } = event.target;
        debugger;
        this.setState({ [id]: value });
    }

    async componentWillMount() {
        let cedula = shortID.generate().replace("-", "0").replace("_", "1").toUpperCase();
        let existsCedula = await checkCedula(cedula);

        while (existsCedula.error) {
            cedula = shortID.generate().replace("-", "0").replace("_", "1").toUpperCase();
            existsCedula = await checkCedula(cedula);
        }

        this.setState({ cedula }, () => {
            M.updateTextFields();
        });
    }

    changeImg=(event)=> {

        let { files } = event.target;
        if (files.length > 0) {
            let file = files[0];
            if (file) {
                var reader = new FileReader();
                reader.onloadend = () => {
                    let fil = file;
                    fil.newName = changeNameFile(file, false);
                    this.setState({ preview: reader.result, fileToUpload: file, success: null, error: null });
                }
                reader.readAsDataURL(file);
            }
        }
    }

    componentDidMount() {
        M.FormSelect.init(document.querySelectorAll('select'), {});
        console.log();
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this.state);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content black-text">
                                <span className="card-title">{this.state.title}</span>
                                <form onSubmit={this.submitForm} className="formUser">
                                    <div className="center-align">
                                        {
                                            this.state.preview ? 
                                            <img src={this.state.preview} alt="" className="circle responsive-img z-depth-5" />
                                            : 
                                            <img src={DEFAULT_PROFILE} alt="" className="circle responsive-img z-depth-5" />
                                        }
                                      
                                    </div>
                                    <div className="center-align">
                                        <button className="waves-effect waves-light btn" type="button"
                                        onClick={()=>{
                                            $("#img").click();
                                        }}
                                        ><i className="material-icons right">camera_alt</i>Cambiar</button>
                                    </div>
                                    <div className="input-field">
                                        <input id="nombre" type="text" onChange={this.onChangeValues} value={this.state.nombre} />
                                        <label htmlFor="nombres">Nombres</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="apellidos" type="text" onChange={this.onChangeValues} value={this.state.apellidos} />
                                        <label htmlFor="apellidos">Apellidos</label>
                                    </div>
                                    <div className="input-field">
                                        <select value={this.state.perfil} id="perfil" onChange={this.onChangeValues}>
                                            <option value="" disabled>Selecciona una Opción</option>
                                            {
                                                Object.keys(PERFILES).map((value, index) => {
                                                    console.log(value);
                                                    let desc = PERFILES[value];
                                                    return (
                                                        <option value={`${value}`} key={value}>{desc}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label>Perfil</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="correo" type="text" onChange={this.onChangeValues} value={this.state.correo} maxLength="50" />
                                        <label htmlFor="correo">Correo</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="telefono" type="text" onChange={this.onChangeValues} value={this.state.telefono} maxLength="10" />
                                        <label htmlFor="telefono">Teléfono</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="cedula" type="text" value={this.state.cedula} readOnly maxLength="4"/>
                                        <label htmlFor="cedula">Cédula</label>
                                    </div>
                                    {
                                        this.state.perfil.trim() !== "4" && this.state.perfil.trim() !== ""?
                                            <div className="input-field">
                                                <input id="password" type="password" value={this.state.password} onChange={this.onChangeValues} maxLength="50" />
                                                <label htmlFor="password">Contraseña</label>
                                            </div>
                                            : null
                                    }
                                    <div className="center-align">
                                        <button className="waves-effect waves-light btn mr-1 green darken-3" type="submit">Guardar</button>
                                        <button className="waves-effect waves-light btn red darken-3" type="button"
                                        onClick={
                                            ()=>{
                                                this.props.history.push("/dashboard/users");
                                            }
                                        }
                                        >Cancelar</button>
                                    </div>
                                    <input type="file" id="img" onChange={this.changeImg} hidden />
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