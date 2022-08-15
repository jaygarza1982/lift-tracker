import React, { useEffect } from 'react';
import './App.css';
import './bulma.min.css';
import { v4 as uuid } from 'uuid';

function App() {

  const exercises = [
    { name: 'Bench press', id: uuid() },
    { name: 'Seated dumbbell press', id: uuid() },
    { name: 'Tricep push-down', id: uuid() },
  ];

  useEffect(() => {
    // Check for support
    const idb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;

    if (!idb) {
      console.log("This browser doesn't support IndexedDB.");
      return;
    }

    const LIFT_DB = 'lift_db';
    const EXERCISES_STORE_NAME = 'exercises';
    const LIFTS_STORE_NAME = 'lifts';

    // Create our stores
    const dbPromise = idb.open(LIFT_DB, 1);

    dbPromise.onerror = e => {
      console.log('db promise error', e);
    }

    dbPromise.onupgradeneeded = e => {
      console.log('db promise on upgrade');
      
      dbPromise.result.createObjectStore(EXERCISES_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      dbPromise.result.createObjectStore(LIFTS_STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }

    // Example of how to write after DB object store creations
    const db = idb.open(LIFT_DB, 1);

    db.onsuccess = e => {
      const trans = db.result.transaction(LIFTS_STORE_NAME, 'readwrite');
  
      const LIFTS_STORE = trans.objectStore(LIFTS_STORE_NAME);
      LIFTS_STORE.put({ name: 'test name here', anotherProp: 'another prop here'});
    }

  }, []);

  return (
    <div className="App">
      {/* List of categories. Clicking on it will bring you to a page where you can add sets of reps like below */}
      <div className="card-grid">
        {
          exercises.map(e =>
          (
            <button
              key={e.id}
              className="button"
              onClick={() => { console.log(e.id); }}
            >
              {e.name}
            </button>
          )
          )
        }
      </div>

    {/* An exercise that you can add sets of reps to */}
      <br />
      <button
        className="button is-primary"
        onClick={() => { console.log('Saving bench press'); }}
      >
        Save
      </button>

      <div>Bench press</div>
      <div className="input-label-grid">
        <div>
          Reps
        </div>
        <div>
          <input
            className="input is-info"
            type="number"
            placeholder="Reps"
          />
        </div>
      </div>
      <div className="input-label-grid">
        <div>
          Weight
        </div>
        <div>
          <input
            className="input is-info"
            type="number"
            placeholder="Weight"
          />
        </div>
      </div>
      <div className="box exercise-description">
        Bench press performed on a bench
      </div>

      {/* TODO: List of "sets" here. When you save, you add to a set along with the current date */}
    </div>
  );
}

export default App;
