const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const LIFT_DB = 'lift_db';

const STORES = {
    EXERCISES: 'exercises',
    LIFTS: 'lifts'
}

const utils = {
    setup: () => {
        // Check for support
        if (!idb) {
            console.log("This browser doesn't support IndexedDB.");
            return;
        }

        // Create our stores
        const dbPromise = idb.open(LIFT_DB, 1);

        dbPromise.onerror = e => {
            console.log('db promise error', e);
        }

        dbPromise.onupgradeneeded = e => {
            console.log('db promise on upgrade');

            dbPromise.result.createObjectStore(STORES.EXERCISES, { keyPath: 'id', autoIncrement: true });
            dbPromise.result.createObjectStore(STORES.LIFTS, { keyPath: 'id', autoIncrement: true });
        }
    },
    write: (storeName, object) => {
        // Example of how to write after DB object store creations
        const db = idb.open(LIFT_DB, 1);

        db.onsuccess = e => {
            const trans = db.result.transaction(storeName, 'readwrite');

            const LIFTS_STORE = trans.objectStore(storeName);
            LIFTS_STORE.put(object);
        }
    }
}

export default { utils: utils, stores: STORES };
