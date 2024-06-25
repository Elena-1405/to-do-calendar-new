import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar, CalendarProps } from './calendar';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { ToDo } from '../list/todolist';

// Mock для CSS модуля
jest.mock('./calendar.module.css', () => ({
  calendar: 'calendar',
  weekDays: 'weekDays',
  weekDay: 'weekDay',
  days: 'days',
  day: 'day',
  dayEmpty: 'dayEmpty',
  hasTodos: 'hasTodos',
}));

// Mock для пропсов
const mockProps: CalendarProps = {
  selectedDate: new Date('2024-06-20'),
  todos: {},
  onDateClick: jest.fn(),
};

describe('Calendar Component', () => {
  test('renders correctly', () => {
    const { getByText, getAllByTestId } = render(<Calendar {...mockProps} />);

    // Проверка наличия заголовка с месяцем и годом
    expect(getByText('июнь 2024')).toBeInTheDocument();

    // Проверка наличия всех дней недели
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    weekDays.forEach((day) => {
      expect(getByText(day)).toBeInTheDocument();
    });

    // Проверка наличия всех чисел дней месяца
    const daysOfMonth = screen.getAllByTestId('calendar-day');
    expect(daysOfMonth).toHaveLength(30);
  });

    // Проверка onDateClick handler
  test('clicking on a day calls onDateClick handler', () => {
    const { getByText } = render(<Calendar {...mockProps} />);
    const dayElement = getByText('20');
    fireEvent.click(dayElement);
    expect(mockProps.onDateClick).toHaveBeenCalledWith(new Date('2024-06-20'));
  });
});

// Проверка задач
const generateMockTodos = (dates: Date[]): { [key: string]: ToDo[] } => {
  return dates.reduce((acc, date) => {
    const dateString = date.toISOString().split('T')[0];
    acc[dateString] = [{ title: `Task for ${dateString}` }];
    return acc;
  }, {} as { [key: string]: ToDo[] });
};

describe('Calendar', () => {
  const selectedDate = new Date(2024, 5, 1);
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start, end });
  const todos = generateMockTodos(days);

  const defaultProps: CalendarProps = {
    selectedDate,
    todos,
    onDateClick: jest.fn(),
  };

  //Проверка отрисовки месяца и года
  it('renders calendar with correct month and year', () => {
    render(<Calendar {...defaultProps} />);
    expect(screen.getByText('июнь 2024')).toBeInTheDocument();
  });


  it('renders days of the month', () => {
    render(<Calendar {...defaultProps} />);
    days.forEach((day) => {
      const dayString = day.getDate().toString();
      expect(screen.getByText(dayString)).toBeInTheDocument();
    });
  });

  it('highlights days with todos', () => {
    render(<Calendar {...defaultProps} />);
    days.forEach((day) => {
      const dayString = day.getDate().toString();
      const dayElement = screen.getByText(dayString);
      const dateString = day.toISOString().split('T')[0];
      if (todos[dateString]) {
        expect(dayElement).toHaveClass('hasTodos');
      }
    });
  });

  it('calls onDateClick when a day is clicked', () => {
    const onDateClick = jest.fn();
    render(<Calendar {...defaultProps} onDateClick={onDateClick} />);
    const firstDay = screen.getByText('1');
    fireEvent.click(firstDay);
    expect(onDateClick).toHaveBeenCalledWith(new Date(2024, 5, 1));
  });
});