import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {FIREBASE_PROPS} from './properties/properties';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import RouterBeforeLogin from './router/router-before-login';

firebase.initializeApp(FIREBASE_PROPS);

ReactDOM.render(<RouterBeforeLogin />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
