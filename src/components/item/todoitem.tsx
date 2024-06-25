import React from 'react';
import styles from './todoitem.module.css';

interface TodoItemProps {
    item: string;
    onRemove: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({item, onRemove}) => (
    <div className={styles.todoItem}>
        <span className={styles.todoItemText}>{item}</span>
        <button
            className={styles.removeButton} 
            onClick={onRemove}>X</button>
    </div>
);