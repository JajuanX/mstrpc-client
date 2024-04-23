import React from 'react';
import styles from './verticalEllipsis.module.scss';

const VerticalEllipsis = ({ type, children, onClick, typeOfButton = 'primary' }) => {
    const buttonTypeClass = `${styles.button} ${styles[typeOfButton]}`;
    return (
        <button type={type} className={buttonTypeClass} onClick={onClick}></button>
    );
};

export default VerticalEllipsis;