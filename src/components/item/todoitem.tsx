import React from 'react';

interface TodoItemProps {
    item: string;
    onRemove: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({item, onRemove}) => (
    <div>
        {item}
        <button 
            onClick={onRemove}>remove</button>
    </div>
);