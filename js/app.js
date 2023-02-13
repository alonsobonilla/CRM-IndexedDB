import { iniciarlizarDB} from "./indexedDB.js";
import { UI } from './Class/UI.js';

const ui = new UI();
document.addEventListener('DOMContentLoaded', () => {
    //Inicializando la BD
    iniciarlizarDB(db => {
        ui.imprimirClientes(db);
    });
})