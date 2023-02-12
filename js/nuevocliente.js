import { formulario } from "./Utilities/selectors.js";
import { validarCliente } from "./Utilities/functions.js";
import { iniciarlizarDB } from "./indexedDB.js";

document.addEventListener('DOMContentLoaded', () => {
    //Inicializando la BD
    iniciarlizarDB();
    //Eventos
    eventListeners();
})

function eventListeners() {
    formulario.addEventListener('submit',validarCliente);
}


