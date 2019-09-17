import React,{Component} from 'react';
import Navigation from './navigation.cmpt';
import firebase from 'firebase';
import {USUARIO} from '../../dummys/user';
import './dashboard.css';

import RouterDashboard from '../../router/router-dashboard';

class Dashboard extends Component{

    state={
        login:false
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                this.props.history.push("/");
            }else{
                this.setState({login:true});
            }
        });
    }

    render(){

        if(!this.state.login){
            return <div></div>
        }
        return(
            <div className="dashContent">
                <Navigation history={this.props.history} usuario={USUARIO} />    
                <RouterDashboard />            
            </div>
        )
    }

}

export default Dashboard;