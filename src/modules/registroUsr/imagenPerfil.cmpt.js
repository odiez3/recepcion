import React, { Component } from 'react';
import Webcam from "react-webcam";
import $ from 'jquery';
import M from 'materialize-css';

const webcamref = React.createRef();

class ImagenPerfil extends Component {
    state = {
        preview: false,
        fileToUpload: false,
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

    submitForm = (event) => {
        event.preventDefault();
        let { fileToUpload,preview } = this.state
       
        let valido = true;

        if(!fileToUpload){
            valido= false;
            M.toast({ html: "Captura tu rostro.", classes: 'red darken-1' })
        }

        if(valido){
            this.props.setImagenPerfil({fileToUpload,preview});
        }
    }

    render() {
        return (
            <div className="row">

                <div className="col s12">
                    <div className="card">
                        <div className="card-content black-text">
                            <span className="card-title">{this.state.title}</span>
                            <form onSubmit={this.submitForm} className="formUser">
                            <span className="card-title">Imagen de Perfil</span>
                            <p >Tomate una foto, asegúrate de que tu rostro se pueda ver con claridad o tendrás problemas para ingresar.</p>
                            <br/>
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
                                <br/>
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
                              
                                <div className="center-align">
                                <br/>
                                <br/>
                                    <button className="waves-effect waves-light btn red darken-3  mr-1" type="button"
                                        onClick={
                                            () => {
                                               this.props.atras();
                                            }
                                        }
                                    >Atras</button>
                                    {
                                        this.state.preview ? 
                                        <button className="waves-effect waves-light btn green darken-3" type="submit">Continuar</button>
                                        : null
                                    }
                                </div>
                                <input type="file" id="img" onChange={this.changeImg} hidden />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ImagenPerfil;