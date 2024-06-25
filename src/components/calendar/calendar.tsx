import React from 'react';
import { ToDo } from '../list/todolist';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
} from 'date-fns';
import styles from './calendar.module.css';

export interface CalendarProps {
  selectedDate: Date;
  todos: { [key: string]: ToDo[] };
  onDateClick: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  todos,
  onDateClick,
}) => {
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start, end });

  const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
    month: 'long',
    year: 'numeric',
  }).format(selectedDate);

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const firstDayOfWeek = getDay(start) === 0 ? 6 : getDay(start) - 1;
  const leadingEmptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div key={'empty-' + i} className={styles.dayEmpty}></div>
  ));

  const dayElements = days.map((day) => {
    const dayString = format(day, 'yyyy-MM-dd');
    const hasTodos = todos[dayString] && todos[dayString].length > 0;
    const dayClassName = hasTodos
      ? `${styles.day} ${styles.hasTodos}`
      : styles.day;

    return (
      <div
        className={dayClassName}
        key={day.toString()}
        onClick={() => onDateClick(day)}
      >
        {format(day, 'd')}
      </div>
    );
  });

  return (
    <div className={styles.calendar}>
      <h2>{formattedDate}</h2>
      <div className={styles.weekDays}>
        {weekDays.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {leadingEmptyDays}
        {dayElements}
      </div>
    </div>
  );
};
