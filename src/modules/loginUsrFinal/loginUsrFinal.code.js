import firebase from 'firebase';
import M from 'materialize-css';
import { ERROR_CODES, GENERIC_ERROR } from '../../properties/properties';


export function checkCedula(cedula){
    return new Promise((resolve,reject)=>{
        firebase.firestore().collection('/users').where('cedula',"==",cedula).get().then((rs)=>{
            if(rs.docs.length){
                resolve(true);
            }else{
                M.toast({html:'No se encontro su usuario favor de registrarte.',classes:'red darken-1'});
                resolve(false);
            }
        }).catch((error)=>{
            M.toast({html:'No se logro generar la cedula automaticamente.',classes:'red darken-1'});
            resolve(false);
        });
    });
    
}