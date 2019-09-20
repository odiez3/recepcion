import React,{Component} from 'react';
import firebase from 'firebase';
import './registro.css';
import DatosPersonales from './personales.cmpt';
import ImagenPerfil from './imagenPerfil.cmpt';
import ConfirmaDatos from './confirmarDatos.cmpt';
class RegistroUsrContainer extends Component{

    /**
     * paso = 0 Ingresa datos Personales
     * paso = 1 Ingresa Imagen de Perfil
     * paso = 2 Confirmar Datos
     *  **/
    state = {
        login:false,
        paso:0,
        personales:false
    }

    setDatosPersonales=(data)=>{
        if(data){
            console.log(data);
            this.setState({personales:data,paso:1});
        }
    }

    setImagenPerfil=(data)=>{
        if(data){
            console.log(data);
            this.setState({imagenPerfil: data,paso:2});
        }
    }

    componentWillMount(){
        firebase.auth().signInAnonymously();

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({login:true});
            }
        });
    }

    atras = ()=>{
        let currentPaso = this.state.paso;
        this.setState({paso:(currentPaso-1)});
    }

    pasoImagen = ()=>{
        this.setState({paso:1});
    }

    pasoDatos = () =>{
        this.setState({paso:0});
    }

    render(){
        return(
        <div className="container">
            <div className="valign-wrapper registroUsr">
                {
                    this.state.paso == 0 && this.state.login  ? <DatosPersonales history={this.props.history} setDatosPersonales={this.setDatosPersonales} datos={this.state.personales}/> : null
                }
                {
                    this.state.paso == 1 && this.state.login ? <ImagenPerfil  setImagenPerfil={this.setImagenPerfil} history={this.props.history} atras={this.atras} /> : null
                }
                {
                    this.state.paso == 2 && this.state.login ?  
                    <ConfirmaDatos 
                    imagenPerfil={this.state.imagenPerfil} 
                    personales={this.state.personales}
                    cambiaImagen={this.pasoImagen} 
                    cambiaDatos={this.pasoDatos} 
                    atras ={this.atras} /> : null
                }
            </div>
        </div>
        )
    }

}


export default RegistroUsrContainer;