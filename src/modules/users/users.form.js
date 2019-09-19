import React, { Component } from 'react';
import { PERFILES, DEFAULT_PROFILE } from '../../properties/properties';
import M from 'materialize-css';
import './users.css';
import * as shortID from 'shortid';
import { checkCedula, changeNameFile, uploadFile, deleteFile, addUser, updateUser, getUser } from './users.code';
import Webcam from "react-webcam";
import { closeModal, openModal } from '../dashboard/dashboard.code';
import $ from 'jquery';

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
}

const webcamref = React.createRef();

class UsersForm extends Component {

    state = {
        title: "Agregar Usuario",
        nombre: "",
        apellidos: "",
        perfil: "",
        correo: "",
        telefono: "",
        cedula: "",
        preview: false,
        fileToUpload: false,
        id: false,
        area:"",
        cargo:"",
    }

    onChangeValues = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value });
    }

    async componentWillMount() {
       
    }

    changeImg = (event) => {

        let { files } = event.target;
        if (files.length > 0) {
            let file = files[0];
            if (file) {
                var reader = new FileReader();
                reader.onloadend = () => {
                    let fil = file;
                    fil.newName = changeNameFile(file, this.state.cedula);
                    this.setState({ preview: reader.result, fileToUpload: file, success: null, error: null });
                }
                reader.readAsDataURL(file);
            }
        }
    }

   async componentDidMount() {
        openModal();
        let cedula = shortID.generate().replace("-", "0").replace("_", "1").toUpperCase();
        let existsCedula = false;
        //Revisa que no tenga ceula
        if (this.props.match && this.props.match.params && this.props.match.params.cedula) {
            cedula = this.props.match.params.cedula;
            let user = await getUser(cedula);

            if(user && user.user){
                this.setState(user.user);
            }

        } else {
            existsCedula = await checkCedula(cedula);
            while (existsCedula.error) {
                cedula = shortID.generate().replace("-", "0").replace("_", "1").toUpperCase();
                existsCedula = await checkCedula(cedula);
            }
        }


        this.setState({ cedula }, () => {
            closeModal();
            M.updateTextFields();
            M.FormSelect.init(document.querySelectorAll('select'), {});
        });
       
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this.state);

        openModal();
        let { perfil, nombre, apellidos, correo, telefono, cedula, fileToUpload, id,cargo,area } = this.state
        let descPerfil = "";
        let valido = true;

        console.log(descPerfil);

        if (nombre.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese el nombre del usuario.", classes: 'red darken-1' });
        }

        if (apellidos.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese los apellidos del usuario.", classes: 'red darken-1' });
        }

        if ((perfil.trim() === "" || !PERFILES[perfil]) && valido) {
            valido = false;
            M.toast({ html: "Elija un Perfil para este usuario.", classes: 'red darken-1' });
        } else {
            if (valido) {
                descPerfil = PERFILES[perfil].toLowerCase();
            }
        }


        if (correo.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese un correo válido.", classes: 'red darken-1' });
        }

        if (telefono.trim() === "" && valido) {
            valido = false;
            M.toast({ html: "Ingrese un Teléfono válido.", classes: 'red darken-1' });
        }


        if (fileToUpload && valido) {
            uploadFile(this.state.preview, `/${descPerfil}/images/${cedula}/${fileToUpload.newName}`).then((result) => {
                let urlProfile = result.downloadURL;
                let data = {
                    perfil,
                    nombre: nombre.trim(),
                    apellidos: apellidos.trim(),
                    correo, telefono: telefono.trim(),
                    cedula: cedula.trim(),
                    urlProfile,
                    nameFile: fileToUpload.newName,
                    nombreToSearch: `${nombre.trim().toUpperCase()} ${apellidos.trim().toUpperCase()}`,
                    area,
                    cargo
                }
                if (id) {
                    updateUser(data, id);
                } else {
                    addUser(data).then((user) => {
                        if (user && user.id) {
                            this.setState({ id: user.id });
                        }
                    });
                }

            }).catch((error) => {
                deleteFile(`/${descPerfil}/images/${cedula}/${fileToUpload.newName}`);
                console.log(error);
                M.toast({ html: "Ocurrio un error al agregar el usuario, intenta de nuevo.", classes: 'red darken-1' });
            })
        } else {
            if (valido && !id) {
                valido = false;
                M.toast({ html: "Elija una Imagen de Perfil para este usuario.", classes: 'red darken-1' });
            } else if (valido && id) {
                let data = {
                    perfil,
                    nombre: nombre.trim(),
                    apellidos: apellidos.trim(),
                    correo, telefono: telefono.trim(),
                    cedula: cedula.trim(),
                    nombreToSeach: `${nombre.trim().toUpperCase()} ${apellidos.trim().toUpperCase()}`
                }
                updateUser(data, id);
            }
        }


        if (!valido) {
            closeModal();
        }


    }

    capture = () => {
        let preview = webcamref.current.getScreenshot();
        this.captureToFile(PeriodicWave, `${this.state.cedula}.jpeg`, "image/jpeg").then((rs) => {
            let fileToUpload = rs;
            fileToUpload.newName = `${this.state.cedula}.jpeg`;
            this.setState({ preview, fileToUpload });
        });
    }

    recapture = () => {
        this.setState({ preview: false });
    }

    captureToFile(data, filename, mimeType) {
        return (fetch(data)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }


    render() {
        if(this.state.cedula.trim() === ""){
            return <div></div>
        }
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
                                                <img src={this.state.preview} alt="" className="responsive-img z-depth-5" />
                                                :
                                                <Webcam
                                                    className="responsive-video z-depth-5 capture"
                                                    audio={false}
                                                    height={225}
                                                    screenshotFormat="image/jpeg"
                                                    width={300}
                                                    ref={webcamref}
                                                />
                                        }
                                    </div>
                                    <div className="center-align">
                                        <button className="waves-effect waves-light btn mr-1 light-blue darken-1" type="button"
                                            onClick={() => {
                                                $("#img").click();
                                            }}
                                        ><i className="material-icons">attach_file</i></button>
                                        <button className="waves-effect waves-light btn light-blue darken-1" type="button"
                                            onClick={() => {
                                                this.state.preview ? this.recapture() : this.capture()
                                            }}
                                        ><i className="material-icons">camera_alt</i></button>
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
                                        <input id="area" type="text" value={this.state.area} />
                                        <label htmlFor="area">Área</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="cargo" type="text" value={this.state.cargo} />
                                        <label htmlFor="cargo">Cargo</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="cedula" type="text" value={this.state.cedula} readOnly maxLength="4" />
                                        <label htmlFor="cedula">Cédula</label>
                                    </div>
                                    <div className="center-align">
                                        <button className="waves-effect waves-light btn mr-1 green darken-3" type="submit">Guardar</button>
                                        <button className="waves-effect waves-light btn red darken-3" type="button"
                                            onClick={
                                                () => {
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