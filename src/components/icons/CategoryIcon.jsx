import React from 'react';

const CategoryIcon = ({ size }) => {
    const defaultSize = 30;

    return (
        <svg
            height={size || defaultSize}
            width={size || defaultSize}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2l-5.5 9h11z" />
            <circle cx="17.5" cy="17.5" r="4.5" />
            <path d="M3 13.5h8v8H3z" />
        </svg>
    );
}

export default CategoryIcon;
