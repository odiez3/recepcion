import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import BackImg from '../../dummys/back.png';
import { PERFILES, MENU_PERFIL } from '../../properties/properties';
import M from 'materialize-css';
import $ from'jquery';

class Navigation extends Component {

    getInstance(){
        var elem = document.querySelector('.sidenav');
        let instance = M.Sidenav.getInstance(elem);

        return instance;
    }

    componentDidMount = () => {
        var elem = document.querySelector('.sidenav');
        M.Sidenav.init(elem, {});
        let instance = this.getInstance();

        $(document).ready(()=>{
            $('.linkSidenav').on('click',()=>{
                instance.close();
            });
        });
    }

    signOut = (event) => {
        event.preventDefault();
        firebase.auth().signOut().then(() => {
            let instance = this.getInstance();
            instance.destroy();
            this.props.history.push("/"); this.props.history.push("/");
        });
    }

    render() {
        let { img, nombre, apePat, apeMat, perfil, correo } = this.props.usuario;
        let menu = MENU_PERFIL[perfil];
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Logo</a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="#" data-target="slide-out" className="sidenav-trigger">
                                <i className="material-icons">menu</i>
                            </a></li>
                        </ul>
                    </div>
                </nav>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={BackImg} />
                            </div>
                            <img className="circle" src={img} />
                            <label><span className="white-text name">{`${nombre} ${apePat} ${apeMat}`}</span></label>
                            <label><span className="white-text email">{correo}</span></label>
                        </div>
                    </li>
                    <li><a className="subheader center-align">Menú {PERFILES[perfil]}</a></li>

                    {
                        menu.map((value, index) => {
                            return <li className="linkSidenav" key={index}><Link key={index} to={value.path}>{value.text}</Link></li>
                        })
                    }
                    <li><div className="divider"></div></li>
                    <li><a className="waves-effect" href="#!" onClick={this.signOut}>Salir</a></li>
                </ul>
            </div>
        )
    }
}


export default Navigation;