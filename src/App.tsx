import React, { useEffect, useState } from 'react';
import { Calendar } from '../src/components/calendar/calendar';
import { TodoList, ToDo } from '../src/components/list/todolist';
import { Modal } from '../src/components/modal/modal';
import styles from './App.module.css';
import { formatISO } from 'date-fns';

const users = ['user1', 'user2'];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState<{
    [key: string]: { [date: string]: ToDo[] };
  }>(JSON.parse(localStorage.getItem(`todos`) || '') || {
    user1: {},
    user2: {},
  });
  const [currentUser, setCurrentUser] = useState<string>('user1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
  }, [currentUser]);

  const addTodo = (date: Date, todo: ToDo) => {
    //const dateString = date.toISOString().split('T')[0]; на моем компьютере срабатывает этот вариант, списки задач отображаются
    const dateString = formatISO(date, { representation: 'date' })
    setTodos((prevTodos: { [x: string]: { [x: string]: any } }) => ({
      ...prevTodos,
      [currentUser]: {
        ...prevTodos[currentUser],
        [dateString]: [...(prevTodos[currentUser][dateString] || []), todo],
      },
    }));
  };

  const removeTodo = (date: Date, index: number) => {
    //const dateString = date.toISOString().split('T')[0]; на моем компьютере срабатывает этот вариант, списки задач отображаются
    const dateString = formatISO(date, { representation: 'date' })
    setTodos((prevTodos: { [x: string]: any }) => {
      const userTodos = { ...prevTodos[currentUser] };
      if (userTodos[dateString]) {
        userTodos[dateString] = userTodos[dateString].filter(
          (_: any, i: number) => i !== index
        );
      }
      return { ...prevTodos, [currentUser]: userTodos };
    });
  };

  const toggleModal = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(!isModalOpen);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUser = e.target.value;
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', newUser);
  };

  return (
    <div className={styles.container}>
      <h1>Календарь и список задач</h1>
      <div className={styles.selectContainer}>
        <select
          className={styles.customSelect}
          value={currentUser}
          onChange={handleUserChange}
        >
          {users.map((user) => (
            <option key={user} value={user} className={styles.option}>
              {user}
            </option>
          ))}
        </select>
      </div>
      <Calendar
        selectedDate={selectedDate}
        onDateClick={toggleModal}
        todos={todos[currentUser]}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <TodoList
            date={selectedDate}
            todos={
              todos[currentUser][selectedDate.toISOString().split('T')[0]] || []
            }
            addTodo={(todo: ToDo) => addTodo(selectedDate, todo)}
            removeTodo={(index: number) => removeTodo(selectedDate, index)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
