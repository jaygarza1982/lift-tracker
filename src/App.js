import React, { useEffect } from 'react';
import './App.css';
import './bulma.min.css';
import dbutils from './dbutils';

function App() {

  const exercises = [
    { name: 'Bench press', id: 1 },
    { name: 'Seated dumbbell press', id: 2 },
    { name: 'Tricep push-down', id: 3 },
  ];

  useEffect(() => {
    dbutils.utils.setup();

    dbutils.utils.write(dbutils.stores.LIFTS, {testProp: 'test prop value'});

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
