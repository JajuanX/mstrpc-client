import React, { useRef, useEffect } from 'react';
import styles from './modal.module.scss'
// consider Passing a function definition to run this modal dynamically
// pass function as props
// 
const Modal = ({ isOpen, onClose, children }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            if (isOpen) {
                dialog.showModal();
            } else {
                dialog.close();
            }

            // Handle the native 'cancel' event to sync with React state
            dialog.addEventListener('cancel', onClose);
        }

        // Cleanup event listener
        return () => {
            if (dialog) {
                dialog.removeEventListener('cancel', onClose);
            }
        };
    }, [isOpen, onClose]);

    return (
        <dialog className={styles.dialog} ref={dialogRef}>
			<div className={styles.dialogContent}>
				<button className={styles.closeButton} onClick={onClose}>X</button>
				{children}
			</div>
        </dialog>
    );
};

export default Modal;