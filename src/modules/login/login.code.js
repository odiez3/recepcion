import firebase from 'firebase';
import M from 'materialize-css';
import { ERROR_CODES, GENERIC_ERROR } from '../../properties/properties';


export function isAdmin(correo) {
    return new Promise((resolve) => {
        firebase.firestore().collection('/users').where("correo", "==", correo).where("perfil", "==", "1").get().then((rs) => {
            if (rs.docs.length && rs.docs.length === 1) {
                let data = rs.docs[0].data();
                resolve(true);
            } else {
                M.toast({ html: "No se encontro algún Administrador con este correo.", classes: 'red darken-1' });
            }
        }).catch((error) => {
            resolve(false);
            console.log(error);
        });
    });

}

export function addAdmin(correo, password) {
    return new Promise((resolve) => {
        firebase.auth().createUserWithEmailAndPassword(correo, password).then((user) => {
            debugger;
            resolve(user);
        }).catch((error) => {

            console.log(error.code, error);
            if (ERROR_CODES[error.code]) {
                M.toast({ html: ERROR_CODES[error.code], classes: 'red darken-1' });
            } else {
                M.toast({ html: GENERIC_ERROR, classes: 'red darken-1' });
            }
            resolve(false);
        });
    });
}

export function forgotPassword(correo) {
    return new Promise((resolve)=>{
        firebase.auth().sendPasswordResetEmail(correo).then((rs) => {
            M.toast({ html: "Se envio una liga a tu correo electrónico <br/> para restablecer tu contraseña.", classes: 'green darken-1' });
            resolve(true);
        }).catch((error) => {
            console.log(error.code);
            if (ERROR_CODES[error.code]) {
                M.toast({ html: ERROR_CODES[error.code], classes: 'red darken-1' });
            } else {
                M.toast({ html: GENERIC_ERROR, classes: 'red darken-1' });
            }
            resolve(false);
        })
    });
 
}