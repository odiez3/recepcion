import React,{Component} from 'react';
import Navigation from './navigation.cmpt';

import {USUARIO} from '../../dummys/user';
import './dashboard.css';

import RouterDashboard from '../../router/router-dashboard';

class Dashboard extends Component{

    render(){
        return(
            <div className="dashContent">
                <Navigation history={this.props.history} usuario={USUARIO} />    
                <RouterDashboard />            
            </div>
        )
    }

}

export default Dashboard;