import React from 'react';
import styles from './button.module.scss';

const Button = ({ type, children, onClick, typeOfButton = 'primary' }) => {
    const buttonTypeClass = `${styles.button} ${styles[typeOfButton]}`;
    return (
        <button type={type} className={buttonTypeClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;