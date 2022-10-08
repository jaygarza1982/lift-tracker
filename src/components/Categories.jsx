import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dbutils from '../dbutils';
import useDeleteModal from './hooks/useDeleteModal';
import TrashIcon from './icons/Trash';

const CategoryLink = ({ category, loadCategories }) => {
    const navigate = useNavigate();

    const deleteAction = async () => {
        const categoriesStore = dbutils.stores.CATEGORIES;

        try {
            await dbutils.utils.delete(categoriesStore, category.id);
            setDeleteOpen(false);
            loadCategories();
        } catch (error) {
            console.log('Could not delete category because', error);
        }
    }

    const [setDeleteOpen, deleteModal] = useDeleteModal({
        title: 'Are you sure?',
        message: `Delete the "${category.categoryName}" category?`,
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
                    onClick={() => { navigate(`/exercises/${category.id}`); }}
                >
                    {category.categoryName}
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

const CategoryAddForm = ({ load }) => {
    
    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        onSubmit: (values) => {
            // Cannot add blank exercise name
            if (values?.categoryName.trim() == '') return;

            const addValues = async () => {
                try {
                    // Write to DB
                    const categories = dbutils.stores.CATEGORIES;

                    await dbutils.utils.write(categories, values);
        
                    // Reload categories
                    load();
                    formik.resetForm();
                } catch (error) {
                    console.log('Could not add category', error);
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
                    placeholder="Category Name"
                    name="categoryName"
                    value={formik.values.categoryName}
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

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        try {
            const categoriesFromDB = await dbutils.utils.readAll(dbutils.stores.CATEGORIES);

            setCategories(categoriesFromDB);
        } catch (error) {
            console.log('Could not read because', error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        // TODO: Way to add categories from this list like the exercises page
        <div className="exercise-categories">
            <CategoryAddForm load={loadCategories} />
            {/* List of categories. Clicking on it will bring you to a page where you can add sets of reps like below */}
            <div className="card-grid">
                {
                    // Add a static "All" category that all exercises are apart of
                    [
                        {
                            id: 'all',
                            categoryName: 'All',
                        },
                        ...categories
                    ].map(c => <CategoryLink key={c.id} category={c} loadCategories={loadCategories} />)
                }
            </div>
        </div>
    );
}

export default Categories;