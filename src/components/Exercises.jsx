import React, { useState } from 'react';
import { useEffect } from 'react';

import { useFormik } from 'formik';

import dbutils from '../dbutils';
import { useNavigate, useParams } from 'react-router-dom';
import TrashIcon from './icons/Trash';
import useModal from './hooks/useModal';
import DataExport from './DataExport';

const ExercisesAddForm = ({ loadExercises }) => {
    
    const formik = useFormik({
        initialValues: {
            exerciseName: '',
        },
        onSubmit: (values) => {
            // Cannot add blank exercise name
            if (values?.exerciseName.trim() == '') return;

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
                    onKeyDown={e => e.key === 'Enter' ? formik.handleSubmit(e) : undefined}
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
        <div className='button-link-with-delete'>
            {deleteModal}
            <div>
                <button
                    className="button button-link"
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

const Exercises = () => {

    const { categoryId } = useParams();

    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        try {
            // If we are on the "All" category, read all exercises
            if (categoryId == 'all') {
                const exercisesFromDB = await dbutils.utils.readAll(dbutils.stores.EXERCISES);
                setExercises(exercisesFromDB);
                return;
            }

            // TODO: Implement this logic below
            // If we are on any other category
            // read from the categories table and fetch exercises that belong to this category
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

            {/* List of exercises. Clicking on it will bring you to a page where you can add sets of reps like below */}
            <div className="card-grid">
                {
                    exercises.map(e => <ExerciseLink key={e.id} exercise={e} loadExercises={loadExercises} />)
                }
            </div>

            <DataExport />
        </>
    );
}

export default Exercises;