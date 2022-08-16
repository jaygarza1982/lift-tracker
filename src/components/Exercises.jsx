import React, { useState } from 'react';
import { useEffect } from 'react';

import { useFormik } from 'formik';

import dbutils from '../dbutils';
import { useNavigate } from 'react-router-dom';

const ExercisesAddForm = ({ loadExercises }) => {
    
    const formik = useFormik({
        initialValues: {
            exerciseName: '',
        },
        onSubmit: (values) => {
            // Write to DB
            const exercises = dbutils.stores.EXERCISES;

            // TODO: Fix handle async
            dbutils.utils.write(exercises, values);

            // Reload exercises
            loadExercises();
            formik.resetForm();
        }
    });

    return (
        <div className="exercise-add-form">
            <div>
                <input
                    className="input is-info"
                    type="text"
                    placeholder="Exercise Name"
                    name="exerciseName"
                    value={formik.values.exerciseName}
                    onChange={formik.handleChange}
                />
            </div>
            <div>
                <button
                    className="button"
                    onClick={formik.handleSubmit}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

    const loadExercises = async () => {
        try {
            const exercisesFromDB = await dbutils.utils.readAll(dbutils.stores.EXERCISES);

            setExercises(exercisesFromDB);
        } catch (error) {
            console.log('Could not read because', error);
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <ExercisesAddForm loadExercises={loadExercises} />

            {/* List of categories. Clicking on it will bring you to a page where you can add sets of reps like below */}
            <div className="card-grid">
                {
                    exercises.map(e =>
                    (
                        <button
                            key={e.id}
                            className="button"
                            onClick={() => { navigate(`/lifts/${e.id}`); }}
                        >
                            {e.exerciseName}
                        </button>
                    ))
                }
            </div>
        </>
    );
}

export default Exercises;