import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import dbutils from '../dbutils';

const Lifts = () => {

    const { exerciseId } = useParams();

    const [exercise, setExercise] = useState({});
    const [lifts, setLifts] = useState([]);
    
    const loadExercise = async () => {
        try {
            if (!exerciseId) return;
            const exercisesStore = dbutils.stores.EXERCISES;
            
            const exerciseFromDB = await dbutils.utils.get(exercisesStore, parseInt(exerciseId));
            
            setExercise(exerciseFromDB);
        } catch (error) {
            console.log('Could not load exercise', error);
        }
    }

    const loadLifts = async () => {
        try {
            if (!exerciseId) return;

            const liftsStore = dbutils.stores.LIFTS;

            // Only return lifts that match this exercise
            const liftsFromDB = (await dbutils.utils.readAll(liftsStore)).filter(l => l.exerciseId == parseInt(exerciseId));

            setLifts(liftsFromDB);
        } catch (error) {
            console.log('Could not load lifts', error);
        }
    }

    useEffect(() => {
        loadExercise();
        loadLifts();
    }, []);

    const formik = useFormik({
        initialValues: {
            reps: '',
            weight: ''
        },
        onSubmit: async (values) => {
            try {
                const liftsStore = dbutils.stores.LIFTS;

                const lift = {
                    exerciseId: parseInt(exerciseId),
                    date: new Date(),
                    ...values
                }

                await dbutils.utils.write(liftsStore, lift);

                formik.resetForm();
                loadLifts();
            } catch (error) {
                console.log('Could not save lifts', error);
            }
        }
    });

    return (
        <>
            {/* An exercise that you can add sets of reps to */}
            <button
                className="button is-primary is-pulled-right"
                onClick={formik.handleSubmit}
            >
                Save
            </button>

            <div className="has-text-centered is-size-2">
                {exercise?.exerciseName}
            </div>
            <div className="set-form-grid">
                <div className="input-label-grid">
                    <div>
                        Reps
                    </div>
                    <div>
                        <input
                            className="input is-info"
                            type="number"
                            placeholder="Reps"
                            name="reps"
                            value={formik.values.reps}
                            onChange={formik.handleChange}
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
                            name="weight"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
            </div>
            {/* TODO: Description box here */}
            {/* <div className="box exercise-description">
                Bench press performed on a bench
            </div> */}

            {/* TODO: Styling */}
            {
                lifts.map(lift => {
                    return (
                        <div key={lift.id} className="lift">
                            {
                                lift.weight + ' ' + lift.reps
                            }
                        </div>
                    )
                })
            }
        </>
    );
}

export default Lifts;