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


export function checkCedula(cedula){
    return new Promise((resolve,reject)=>{
        firebase.firestore().collection('/users').where('cedula',"==",cedula).get().then((rs)=>{
            if(rs.docs.length){
                reject({error:true});
            }else{
                resolve({error:false});
            }
        }).catch((error)=>{
            M.toast({html:'No se logro generar la cedula automaticamente.',classes:'red darken-1'})
        });
    });
    
}

export function changeNameFile(file, name) {
    //Obtiene la extensión del archivo
    let splitFileName = file.name.split(".");
    let extension = splitFileName[splitFileName.length - 1];
    let newName = "";

    if (name) {
        newName = `${name.trim()}.${extension}`;
    } else {
        //Genera un nombre random;
        let date = new Date();
        let random = Math.floor(Math.random() * 99999) + 1;
        newName = `${date.getTime()}${random}.${extension}`;
    }

    return newName;
}
