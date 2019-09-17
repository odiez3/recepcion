import firebase from 'firebase';
import M from 'materialize-css';

export function addUser(data){
    firebase.firestore().collection('/users').add(data).then((userAdded)=>{
        M.toast({html: 'Usuario Agregado Correctamente', classes: 'green darken-1'});
    }).catch((error)=>{
        console.log(error);
        M.toast({html: 'No se logro agregar al usuario intente mas tarde.',classes:'red darken-1'});
    });
}