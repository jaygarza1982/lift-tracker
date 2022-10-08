import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dbutils from '../dbutils';
import useDBFetch from './hooks/useDBFetch';

const CategoryButton = ({ category }) => {
    return (
        <button
            className="button button-link"
            onClick={() => { console.log('Would add', category); }}
        >
            {category.categoryName}
        </button>
    );
}

const CategoryFormBody = ({ exerciseId }) => {

    const [categories, loadCategories] = useDBFetch(dbutils.stores.CATEGORIES);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="exercise-categories">
            <div className="card-grid">
                {
                    [
                        {
                            id: 'all',
                            categoryName: 'test cat'
                        },
                        ...categories].map(c => <CategoryButton key={c.id} category={c} />)
                }
            </div>
        </div>
    );
}

const constructCategoryAddForms = (exerciseId) => {
    const catAddFormBody = <CategoryFormBody exerciseId={exerciseId} />

    return [catAddFormBody, ]
}

export default constructCategoryAddForms;