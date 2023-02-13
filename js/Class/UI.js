import { nombreI, emailI, telefonoI, empresaI,formulario } from "../Utilities/selectors.js";
import { scripting, addChildNodes, eliminarCliente } from '../Utilities/functions.js';
import { Cliente } from "./Cliente.js";

class UI {
    imprimirAlerta(mensaje, tipo) {
        //Creamos la alerta
        const div = document.createElement('DIV');
        div.textContent = mensaje;
        div.classList.add('px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center','border','mensaje-alerta');
        if(tipo) {
            div.classList.add('bg-red-100','border-red-400','text-red-700');
        } else {
            div.classList.add('bg-green-100','border-green-400','text-green-700');
        }
        //Insertamos al DOM
        if(document.querySelector('.mensaje-alerta')) {
            document.querySelector('.mensaje-alerta').remove();
            formulario.appendChild(div);
        } else {
            formulario.appendChild(div);
        }
        
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    imprimirClientes(db) {
        //Leer el contenido de la BD
        const objectStore = db.transaction('crm').objectStore('crm');
        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;
            if(cursor) {
                const {nombre, email, empresa, telefono, id} = cursor.value;
                const listadoClientes = document.querySelector('#listado-clientes');

                const tr = scripting('TR');
                const tdNombreEmail = scripting('TD',['px-6','py-4','whitespace-no-wrap','border-b','border-gray-200']);
                const tdTelefono = tdNombreEmail.cloneNode(false);
                const tdEmpresa = tdNombreEmail.cloneNode(false);
                tdEmpresa.classList.add('leading-5','text-gray-700');
                const tdBotones = tdNombreEmail.cloneNode(false);
                tdBotones.classList.add('text-sm', 'leading-5');
                const pNombre = scripting('P',['text-sm','leading-5','font-medium','text-gray-700','text-lg','font-bold'],nombre);
                const pEmail = scripting('P',['text-sm','leading-10','text-gray-700'],email);
                const pTelefono = scripting('P',['text-gray-700'],telefono);
                const pEmpresa = scripting('P',['text-gray-600'],empresa);
                const aEditar = scripting('A',['text-teal-600','hover:text-teal-900','mr-5'],'Editar');
                const aEliminar = scripting('A',['text-red-600','hover:text-red-900'],'Eliminar');

                const cliente = new Cliente(id,nombre,email,telefono,empresa);
                aEliminar.onclick = function(e) {
                    eliminarCliente(e,cliente);
                }
                
                aEditar.href = `editar-cliente.html?id=${id}`
                aEliminar.href = '#';
                aEliminar.dataset.id = id;
                
                //Añadimos los elementos
                addChildNodes(tdNombreEmail,[pNombre,pEmail])
                tdTelefono.appendChild(pTelefono);
                tdEmpresa.appendChild(pEmpresa);
                addChildNodes(tdBotones,[aEditar,aEliminar]);
                addChildNodes(tr,[tdNombreEmail,tdTelefono,tdEmpresa,tdBotones])
                listadoClientes.appendChild(tr);
                //Continuamos con el siguiente elemento
                cursor.continue();
            }
        }
    }
    llenarFormulario(cliente) {
        nombreI.value = cliente.nombre;
        telefonoI.value = cliente.telefono;
        emailI.value = cliente.email;
        empresaI.value = cliente.empresa;
    }
}
export { UI };