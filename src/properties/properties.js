import PROFILE_DEFAULT from './Person.png';
export const FIREBASE_PROPS = {
    apiKey: "AIzaSyBUJGTVRMRfir7hI85QRBFgSz0zZclm34k",
    authDomain: "freelancer-4107d.firebaseapp.com",
    databaseURL: "https://freelancer-4107d.firebaseio.com",
    projectId: "freelancer-4107d",
    storageBucket: "freelancer-4107d.appspot.com",
    messagingSenderId: "6003852237",
    appId: "1:6003852237:web:3a4647ddc1587fe5f0fa84"
  };

export const ERROR_CODES = {
  "auth/user-not-found": "Usuario no encontrado.",
  "auth/wrong-password":"Contraseña incorrecta."
};

export const GENERIC_ERROR = "Ocurrio un error inesperado intente mas tarde.";

export const PERFILES = {
  1:"Administrador",
  2:"Empleado",
  3:"Recepcionista",
  4:"Usuario"
};

export const DEFAULT_PROFILE = PROFILE_DEFAULT;

export const MENU_PERFIL = {
  1:[
    {
      path:"/dashboard/users",
      text:"Usuarios"
    },
    {
      path:"/dashboard/reporteria",
      text:"Reporteria"
    }
  ]
}