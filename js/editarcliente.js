import { iniciarlizarDB, db } from "./indexedDB.js";
import { actualizarCliente, obtenerCliente } from "./Utilities/functions.js";
import { formulario } from "./Utilities/selectors.js";

document.addEventListener('DOMContentLoaded', () => {
    iniciarlizarDB();
    //Verificar el id del URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idClient = Number(parametrosURL.get('id'));
    if(idClient) {
        setTimeout(() => {
            obtenerCliente(db,idClient); 
        }, 100);
    }
    //Actualizar registro
    formulario.addEventListener('submit',actualizarCliente);
})