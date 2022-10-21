import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dbutils from '../dbutils';
import useDBFetch from './hooks/useDBFetch';

const CategoryButton = ({ category, exerciseId, mappedLifts, loadMappedLifts }) => {
    const addCategory = async () => {
        console.log('Add category', category, ' exercise', exerciseId);
        console.log('Current lifts in cat', mappedLifts);

        try {
            const toAdd = {
                categoryId: category.id,
                exerciseId: parseInt(exerciseId)
            }

            // TODO: Check if this object exists and toggle based on if it does or not

            await dbutils.utils.write(dbutils.stores.LIFTS_IN_CATEGORIES, toAdd);
        } catch (error) {
            console.log('Could not write category', error);
        }
    }

    return (
        <button
            className="button button-link"
            onClick={addCategory}
        >
            {category.categoryName}
        </button>
    );
}

const CategoryFormBody = ({ exerciseId }) => {

    const [categories, loadCategories] = useDBFetch(dbutils.stores.CATEGORIES);
    const [mappedLifts, loadMappedLifts] = useDBFetch(dbutils.stores.LIFTS_IN_CATEGORIES);

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="exercise-categories">
            <div className="card-grid">
                {
                    // TODO: Color these buttons differently when category is activated
                    // TODO: These buttons should be used as a toggle instead of just adding to the store
                    categories.map(c =>
                        <CategoryButton
                            key={c.id}
                            exerciseId={exerciseId}
                            category={c}
                            mappedLifts={mappedLifts}
                            loadMappedLifts={loadMappedLifts}
                        />
                    )
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