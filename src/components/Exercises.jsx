import React, { useState } from 'react';
import { useEffect } from 'react';

import { useFormik } from 'formik';

import dbutils from '../dbutils';
import { useNavigate } from 'react-router-dom';
import TrashIcon from './icons/Trash';
import useModal from './hooks/useModal';

const ExercisesAddForm = ({ loadExercises }) => {
    
    const formik = useFormik({
        initialValues: {
            exerciseName: '',
        },
        onSubmit: (values) => {
            const addValues = async () => {
                try {
                    // Write to DB
                    const exercises = dbutils.stores.EXERCISES;

                    await dbutils.utils.write(exercises, values);
        
                    // Reload exercises
                    loadExercises();
                    formik.resetForm();
                } catch (error) {
                    console.log('Could not add set', error);
                }
            }

            addValues();
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

const ExerciseLink = ({ exercise, loadExercises }) => {
    const navigate = useNavigate();

    const deleteAction = async () => {
        const exerciseStore = dbutils.stores.EXERCISES;

        try {
            await dbutils.utils.delete(exerciseStore, exercise.id);
            setDeleteOpen(false);
            loadExercises();
        } catch (error) {
            console.log('Could not delete exercise because', error);
        }
    }

    const [setDeleteOpen, deleteModal] = useModal({
        title: 'Are you sure?',
        message: `"${exercise.exerciseName}" and its history will be gone forever.`,
        saveAction: deleteAction
    });


    const openDeleteModal = () => {
        setDeleteOpen(true);
    };

    return (
        <div className='exercise-button-grid'>
            {deleteModal}
            <div>
                <button
                    className="button exercise-button-link"
                    onClick={() => { navigate(`/lifts/${exercise.id}`); }}
                >
                    {exercise.exerciseName}
                </button>
            </div>
            <div>
                <button className='button' onClick={openDeleteModal}>
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
}

// TODO: Way to export all user data as JSON file. We should be able to create a link to a "blob" to download user data

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

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
                    exercises.map(e => <ExerciseLink key={e.id} exercise={e} loadExercises={loadExercises} />)
                }
            </div>
        </>
    );
}

export default Exercises;