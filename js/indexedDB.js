export let db;
export function iniciarlizarDB(printClients) {
    const indexedDB = window.indexedDB.open('crm',1);

    indexedDB.onerror = function() {
        console.log('Hubo un error');
    }
    indexedDB.onsuccess = function() {
        db = indexedDB.result;
        if(printClients) {
            //Para iterar sobre los datos de la base de datos (app.js)
            printClients(db);
        }
    }
    indexedDB.onupgradeneeded = function(e) {
        const db = e.target.result;
        const objectStore = db.createObjectStore('crm',{keyPath: 'id',autoIncrement:true});
        objectStore.createIndex('nombre','nombre',{unique:false});
        objectStore.createIndex('email','email',{unique:true});
        objectStore.createIndex('telefono','telefono',{unique:false});
        objectStore.createIndex('empresa','empresa',{unique:false});
        objectStore.createIndex('id','id',{unique:true});

        console.log('DB lista y creada');
    }
}