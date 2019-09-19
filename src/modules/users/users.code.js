import firebase from 'firebase';
import M from 'materialize-css';
import {closeModal} from '../dashboard/dashboard.code';

export function addUser(data){
    return new Promise((resolve)=>{
        firebase.firestore().collection('/users').add(data).then((userAdded)=>{
            resolve({id:userAdded.id});
            M.toast({html: 'Usuario Agregado Correctamente', classes: 'green darken-1'});
            closeModal();

        }).catch((error)=>{
            console.log(error);
            M.toast({html: 'No se logro agregar al usuario intente mas tarde.',classes:'red darken-1'});
            closeModal();
            resolve(false);
        });
    });
}


export function addAdmin(correo,password){
    return new Promise((resolve,reject)=>{
            firebase.auth().createUserWithEmailAndPassword(correo,password).then((user)=>{
                resolve(true);
            }).catch((error)=>{
                M.toast({html: 'No se logro agregar al administrador intente mas tarde.',classes:'red darken-1'});
                reject(error);
            })
    })
}



export function getUser(cedula){
    return new Promise((resolve)=>{
        firebase.firestore().collection(`/users`).where('cedula',"==",cedula).get().then((rs)=>{
            if(rs.docs.length){
                let data = rs.docs[0].data();
                data.id = rs.docs[0].id;
                data.preview = data.urlProfile;
                resolve({user:data});
            }else{
                M.toast({html: 'No se encontro al Usuario.',classes:'red darken-1'});
                closeModal();
                resolve(false);
            }
        }).catch((error)=>{
            console.log(error);
            M.toast({html: 'No se logro obtener al usuario intente mas tarde.',classes:'red darken-1'});
            closeModal();
            resolve(false);
        })
    });
}

export function updateUser(data,id){
    return new Promise((resolve)=>{
        firebase.firestore().doc(`/users/${id}`).update(data).then((userUpdated)=>{
            resolve({id});
            M.toast({html: 'Usuario Actualizado Correctamente', classes: 'green darken-1'});
            closeModal();
        }).catch((error)=>{
            console.log(error);
            M.toast({html: 'No se logro actualizar al usuario intente mas tarde.',classes:'red darken-1'});
            closeModal();
            resolve(false);
        });
    });
}


export function checkCedula(cedula){
    return new Promise((resolve,reject)=>{
        firebase.firestore().collection('/users').where('cedula',"==",cedula).get().then((rs)=>{
            debugger;
            if(rs.docs.length){
                reject({error:true});
            }else{
                resolve({error:false});
            }
        }).catch((error)=>{
         
            M.toast({html:'No se logro generar la cedula automaticamente.',classes:'red darken-1'});
            resolve(false);
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


export function uploadFile(preview, ref) {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref();

        let uploadTask = storageRef.child(ref).putString(preview,'data_url');

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                console.log(error);
                let msg = "Ocurrio un error inesperado al subir la imagen del usuario vuelva a intentarlo.";
                reject({ error: error, msg });

            }, () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve({ downloadURL });
                });
            });
    });
}

export function deleteFile(ref) {
    return new Promise((resolve, reject) => {

        let storageRef = firebase.storage().ref();

        var desertRef = storageRef.child(ref);

        // Delete the file
        desertRef.delete().then(() => {
            resolve({ msg: "Archivo Eliminado" });
        }).catch((error) => {
           console.log(error);
            reject({ error:true, msg:"Ocurrio un error inesperado" });
        });
    });
}


export function searchByName(name){
    
    return new Promise((resolve)=>{
        firebase.firestore().collection('/users').get().then((rs)=>{
            let docs = rs.docs;
            let users = [];
            if(docs.length){
                for(var usr of docs){
                    let data = usr.data();
                     if(data.nombreToSearch.includes(name.trim().toUpperCase())){
                        data.id = usr.id;
                        data.preview = data.urlProfile;
                        users.push(data);
                     }
                }
                if(users.length){
                    resolve(users);
                }else{
                    M.toast({html:'No existen coincidencias.',classes:'red darken-1'});
                    resolve(false);
                }
              
            }else{
                M.toast({html:'No se lograron recuperar usuarios.',classes:'red darken-1'});
                resolve(false);
            }
        }).catch((error)=>{
            M.toast({html:'Ocurrio un error al recuperar usuarios. <br>Intente de nuevo.',classes:'red darken-1'});
        })
    });
}

export function creaSolicitud(cedulaAVisitar, cedulaVisitante){

    let date = new Date();
    let data = {
        visitante : cedulaVisitante,
        empleado: cedulaAVisitar,
        aceptada:false,
        fechaCreacion: date.getTime()
    }

    return new Promise((resolve)=>{
        firebase.firestore().collection('/solicitudes').add(data).then((rs)=>{
            resolve(true);
        }).catch((error)=>{
            M.toast({html:'No se logro enviar la solicitud intenta de nuevo.',classes:'red darken-1'});
            resolve(false);
        })
    });
  
}