import React, { useState } from 'react';
import styles from './todoitem.module.css';

interface TodoItemProps {
  item: string;
  onRemove: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ item, onRemove }) => {
  const [isComplete, setIsComplete] = useState(false);

  const toggleCompletion = () => {
    setIsComplete((prev) => !prev);
  };

  return (
    <div className={styles.todoItem}>
      <span
        className={`${styles.todoItemText} ${
          isComplete ? styles.complete : ''
        }`}
        onClick={toggleCompletion}
      >
        {item}
      </span>
      <button className={styles.removeButton} onClick={onRemove}>
        X
      </button>
    </div>
  );
};
