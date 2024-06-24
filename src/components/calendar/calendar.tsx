import React from 'react';
import { ToDo } from '../list/todolist';
import { startOfMonth, endOfMonth, eachDayOfInterval } from '../../utils/dates';
import styles from './calendar.module.css';

export interface CalendarProps {
    selectedDate: Date;
    todos: { [key: string]: ToDo[] };
    onDateClick: (date: Date) => void;
    holidays: { [key: string]: boolean };
}

export const Calendar: React.FC<CalendarProps> = ({selectedDate, todos, onDateClick, holidays}) => {
    
const formatDay = (date: Date): string => {
    return date.getDate().toString();
};

const formatMonth = (date: Date): string => {
    return date.toLocaleString('default', {month: 'long'});
};

const start = startOfMonth(selectedDate);
const end = endOfMonth(selectedDate);
const days = eachDayOfInterval(start, end);

const dayElement = days.map((day) => {
    const dayString = day.toISOString().split('T')[0];
    const hasTodos = todos[dayString] && todos[dayString].length > 0;
    const isHoliday = holidays[dayString];
    const dayClassName = hasTodos 
    ? `${styles.day} ${styles.hasTodos}`
    : isHoliday 
    ? `${styles.day} ${styles.holiday}`
    : styles.day;

    return (
        <div
                className={dayClassName}
                key={day.toString()}
                onClick={() => onDateClick(day)}>
                    {formatDay(day)}
            </div>
    );
});

return (
    <div className={styles.calendar}>
        <h2>{formatMonth(selectedDate)}</h2>
        {dayElement}
    </div>
);
};
