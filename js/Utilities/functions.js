import { Cliente } from "../Class/Cliente.js";
import { UI } from "../Class/UI.js";
import { nombreI, emailI, telefonoI, empresaI } from './selectors.js';
import { db } from "../indexedDB.js";

let editando = false;
function validarCliente(e) {
    e.preventDefault();
    const ui = new UI();

    const nombre = nombreI.value;
    const email = emailI.value;
    const telefono = telefonoI.value;
    const empresa = empresaI.value;
    
    if(nombre === '' || email === '' || telefono === '' || empresa === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    if(editando) {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idClient = Number(parametrosURL.get('id'));
        //Intanciamos un cliente
        const cliente = new Cliente(idClient,nombreI.value,emailI.value,telefonoI.value,empresaI.value);
        //Actualizamos el cliente
        cliente.actualizarCliente(db,ui);
        editando = false;
    } else {
        //Instanciamos un cliente
        const cliente = new Cliente(Date.now(),nombre,email,telefono,empresa);
        //Agregamos a la bd
        cliente.agregarCliente(db,ui);
    }
}

function actualizarCliente(e) {
    editando = true;
    //Validamos los datos insertados
    validarCliente(e);
}

function obtenerCliente(db,id) {
    const ui = new UI();
    const transaction = db.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');
    
    const cliente = objectStore.openCursor();
    cliente.onsuccess = function(e) {
        const cursor = e.target.result;
        if(cursor) {
            if(cursor.value.id === id) {
                ui.llenarFormulario(cursor.value);
            }
            cursor.continue();
        }
    }
}

function eliminarCliente(e,cliente) {
    cliente.eliminarCliente(db,e);
}
function scripting(etiqueta, clases = [], mensaje) {
    
    const crearEtiqueta = document.createElement(etiqueta);
    if(clases.length != 0) {
        clases.forEach( clase => {
            crearEtiqueta.classList.add(clase);
        });
    }
    if(mensaje)
        crearEtiqueta.textContent = mensaje;
    return crearEtiqueta;
}

function addChildNodes(node,childs) {
    childs.forEach(child => {
        node.appendChild(child);
    })
}

export {validarCliente, actualizarCliente, obtenerCliente, eliminarCliente, scripting, addChildNodes};