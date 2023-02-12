import { Cliente } from "../Class/Cliente.js";
import { nombreI, emailI, telefonoI, empresaI, formulario } from './selectors.js';
import { db } from "../indexedDB.js";
import { ui } from "../app.js";

export function validarCliente(e) {
    e.preventDefault();
    const nombre = nombreI.value;
    const email = emailI.value;
    const telefono = telefonoI.value;
    const empresa = empresaI.value;

    if(nombre === '' || email === '' || telefono === '' || empresa === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    //Instanciamos un cliente
    const cliente = new Cliente(Date.now(),nombre,email,telefono,empresa);
    //Agregamos a la bd
    cliente.agregarCliente(db, ui);
    //Reseteamos el formulario
    formulario.reset();
}
export function scripting(etiqueta, clases = [], mensaje) {
    
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

export function addChildNodes(node,childs) {
    childs.forEach(child => {
        node.appendChild(child);
    })
}