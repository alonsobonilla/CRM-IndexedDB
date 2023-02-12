export class Cliente {
    constructor(id,nombre,email,telefono,empresa) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.empresa = empresa;
    }
    agregarCliente(db, ui) {
        const transaction = db.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        //Agregamos
        objectStore.add(this);
        transaction.onerror = function() {
            ui.imprimirAlerta('Email duplicado','error');
        }
        transaction.oncomplete = function() {
            ui.imprimirAlerta('Cliente agregado correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
}