const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const LIFT_DB = 'lift_db';
const DB_VERSION = 1;

const STORES = {
    EXERCISES: 'exercises',
    LIFTS: 'lifts'
}

const databaseSetup = () => {
    return new Promise((resolve, reject) => {
        // Check for support
        if (!idb) {
            console.log("This browser doesn't support IndexedDB.");
            return;
        }

        // Create our stores
        const dbPromise = idb.open(LIFT_DB, DB_VERSION);

        dbPromise.onblocked = e => {
            console.log('Trying to create stores was blocked.', e);
        }

        dbPromise.onsuccess = e => {
            resolve(e);
        }
        
        dbPromise.onupgradeneeded = e => {
            console.log('db upgrading');

            dbPromise.result.createObjectStore(STORES.EXERCISES, { keyPath: 'id', autoIncrement: true });
            dbPromise.result.createObjectStore(STORES.LIFTS, { keyPath: 'id', autoIncrement: true });

            resolve(e);
        }

        dbPromise.onerror = e => {
            console.log('db error', e);
            reject(e);
        }
    });
}

const utils = {
    setup: databaseSetup,
    write: async (storeName, object) => {
        await databaseSetup();

        // Example of how to write after DB object store creations
        const db = idb.open(LIFT_DB, DB_VERSION);

        db.onsuccess = e => {
            const trans = db.result.transaction(storeName, 'readwrite');

            const store = trans.objectStore(storeName);
            store.put(object);
        }
    },
    readAll: (storeName) => {
        // Reads all from a store
        return new Promise(async (resolve, reject) => {
            await databaseSetup();

            const db = idb.open(LIFT_DB, DB_VERSION);

            db.onsuccess = e => {
                try {
                    const trans = db.result.transaction(storeName, 'readwrite');

                    const store = trans.objectStore(storeName);

                    const getAllReq = store.getAll();

                    getAllReq.onsuccess = getAllEvent => {
                        return resolve(getAllEvent.target.result);
                    }

                    getAllReq.onerror = e => reject(e);
                } catch (error) {
                    reject(error);
                }
            }

            db.onerror = e => reject(e);
        });
    },
    get: (storeName, key) => {
        // Reads specific object from store
        return new Promise(async (resolve, reject) => {
            await databaseSetup();

            const db = idb.open(LIFT_DB, DB_VERSION);

            db.onsuccess = e => {
                try {
                    const trans = db.result.transaction(storeName, 'readwrite');

                    const store = trans.objectStore(storeName);

                    const getReq = store.get(key);

                    getReq.onsuccess = getAllEvent => {
                        return resolve(getAllEvent.target.result);
                    }

                    getReq.onerror = e => reject(e);
                } catch (error) {
                    reject(error);
                }
            }

            db.onerror = e => reject(e);
        });
    },
    delete: (storeName, key) => {
        // Deletes specific object from store
        return new Promise(async (resolve, reject) => {
            await databaseSetup();

            const db = idb.open(LIFT_DB, DB_VERSION);

            db.onsuccess = e => {
                try {
                    const trans = db.result.transaction(storeName, 'readwrite');

                    const store = trans.objectStore(storeName);

                    const deleteReq = store.delete(key);

                    deleteReq.onsuccess = getAllEvent => {
                        return resolve(getAllEvent.target.result);
                    }

                    deleteReq.onerror = e => reject(e);
                } catch (error) {
                    reject(error);
                }
            }

            db.onerror = e => reject(e);
        });
    }
}

const getUserData = async () => {
    const exercises = await utils.readAll(STORES.EXERCISES);
    const lifts = await utils.readAll(STORES.LIFTS);

    return JSON.stringify({ exercises: exercises, lifts: lifts });
}

const toExport = { utils: utils, stores: STORES, getUserData: getUserData };

export default toExport;
