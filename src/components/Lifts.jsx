import React from 'react';

const Lifts = () => {
    return (
        <>
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
        </>
    );
}

export default Lifts;