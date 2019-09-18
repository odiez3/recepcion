import M from 'materialize-css';


export function closeModal() {
    var elems = document.querySelectorAll('.modal');
    let instance = M.Modal.getInstance(elems[0]);
    if (instance) {
        instance.close();
    }

}


export function openModal() {
    var elems = document.querySelectorAll('.modal');
    let instance = M.Modal.getInstance(elems[0]);
    if (instance) {
        instance.open();
    }

}