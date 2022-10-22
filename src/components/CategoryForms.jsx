import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dbutils from '../dbutils';
import useDBFetch from './hooks/useDBFetch';
import getLiftInCategory from './utils/liftsInCategoryPred';

const CategoryButton = ({ category, exerciseId, loadMappedLifts }) => {
    const [isInCat, setIsInCat] = useState(false);
    const [mappedLifts, setMappedLifts] = useState([]);
    
    const loadCategoryContext = async () => {
        const mappedFromDB = await loadMappedLifts();
        
        setIsInCat(mappedFromDB.some(
            getLiftInCategory(
                parseInt(exerciseId),
                category.id
            )
        ));
        setMappedLifts(mappedFromDB);
    }
    
    useEffect(() => {
        loadCategoryContext();
    }, []);


    const addCategory = async () => {
        try {
            // If this is not yet added, add it and return
            if (!isInCat) {
                const toAdd = {
                    categoryId: category.id,
                    exerciseId: parseInt(exerciseId)
                }

                await dbutils.utils.write(dbutils.stores.LIFTS_IN_CATEGORIES, toAdd);
                loadCategoryContext();
                return;
            }

            // If we are in the category already, delete it from the store
            const existingId = mappedLifts.find(
                getLiftInCategory(
                    parseInt(exerciseId),
                    category.id
                )
            ).id;

            await dbutils.utils.delete(dbutils.stores.LIFTS_IN_CATEGORIES, existingId)
            loadCategoryContext();
        } catch (error) {
            console.log('Could not write category', error);
        }
    }

    return (
        <button
            // Make primary color if our exercise is in this category
            className={`button button-link ${isInCat ? 'is-primary' : ''}`}
            onClick={addCategory}
        >
            {category.categoryName}
        </button>
    );
}

const CategoryFormBody = ({ exerciseId }) => {

    const [categories, loadCategories] = useDBFetch(dbutils.stores.CATEGORIES);
    const [, loadMappedLifts] = useDBFetch(dbutils.stores.LIFTS_IN_CATEGORIES);

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="exercise-categories">
            <div className="card-grid">
                {
                    categories.map(c =>
                        <CategoryButton
                            key={c.id}
                            exerciseId={exerciseId}
                            category={c}
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