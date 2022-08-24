import React from 'react';
import dbutils from '../dbutils';

const DataExport = () => {

    const getAllData = async () => {
        try {
            const userData = await dbutils.getUserData();
            
            downloadContentAsFile(userData, 'JSON', 'lift-data.json');
        } catch (error) {
            console.log('Could not export data', error);
        }
    }

    // https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server#:~:text=16-,Use%20Blob,-%3A
    const downloadContentAsFile = (content, mimeType, filename) => {
        const a = document.createElement('a');
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        a.click();
    }

    return (
        <div className="data-export">
            <button
                className="button is-fullwidth"
                onClick={getAllData}
            >
                Export Data
            </button>
        </div>
    );
}

export default DataExport;