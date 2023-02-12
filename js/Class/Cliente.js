import { formulario } from "../Utilities/selectors.js";

class Cliente {
    constructor(id,nombre,email,telefono,empresa) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.empresa = empresa;
    }
    agregarCliente(db,ui) {
        const transaction = db.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        //Agregamos
        objectStore.add(this);
        transaction.onerror = function() {
            ui.imprimirAlerta('Email duplicado','error');
        }
        transaction.oncomplete = function() {
            ui.imprimirAlerta('Cliente agregado correctamente');
            //Reseteamos el formulario
            formulario.reset();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
    
    actualizarCliente(db,ui) {
        const transaction = db.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        console.log('Entramos aca!!')
        //Editamos los datos
        objectStore.put(this);
        console.log(this);
        transaction.oncomplete = function() {
            ui.imprimirAlerta('Cliente editado correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
        transaction.onerror = function(e) {
            console.log('Hubo un error' + e.target.result);
            console.log(e.target);
        }
    }

    eliminarCliente(db,e) {
        const transaction = db.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.delete(this.id);

        transaction.onerror = function() {
            console.log('Hubo un error');
        }
        transaction.oncomplete = function() {
            console.log('Eliminado correctamente');
            e.target.parentElement.parentElement.remove();
        }
    }
}
export { Cliente };