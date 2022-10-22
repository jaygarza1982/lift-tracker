
// Predicate for matching a mapped lift to a category
const getLiftInCategory = (exerciseId, categoryId) => {
    return m => m.exerciseId == exerciseId && m.categoryId == categoryId;
}

export default getLiftInCategory;