import React from 'react';
import { useState } from 'react';
import dbutils from '../../dbutils';

const useDBFetch = (store) => {
    const [entries, setEntries] = useState([]);

    const loadEntries = async () => {
        try {
            const fromDB = await dbutils.utils.readAll(store);

            setEntries(fromDB);
        } catch (error) {
            console.log('Could not read because', error);
        }
    }

    return [entries, loadEntries];
}

export default useDBFetch;