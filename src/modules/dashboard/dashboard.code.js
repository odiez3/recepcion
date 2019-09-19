import M from 'materialize-css';
import firebase from 'firebase';


export function closeModal() {
    var elems = document.querySelectorAll('.modal');
    if (elems.length) {
        let instance = M.Modal.getInstance(elems[0]);
         instance.close();
    }

}


export function openModal() {
    var elems = document.querySelectorAll('.modal');
    if (elems.length) {
    let instance = M.Modal.getInstance(elems[0]);
   
        instance.open();
    }

}

export function getUserCorreo(correo){
    return new Promise((resolve)=>{
        firebase.firestore().collection(`/users`).where('correo',"==",correo).get().then((rs)=>{
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