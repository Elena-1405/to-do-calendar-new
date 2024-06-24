import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};