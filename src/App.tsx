import React, { useEffect, useState } from 'react';
import { Calendar, CalendarProps } from '../src/components/calendar/calendar';
import { TodoList, ToDo} from '../src/components/list/todolist';
import { Modal } from '../src/components/modal/modal';

const users = ['user1', 'user2'];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ todos, setTodos ] = useState<{ [key: string]: {[date: string]: ToDo[] }}>({
    user1: {},
    user2: {},
  });
  const [currentUser, setCurrentUser] = useState<string>('user1');
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ holidays, setHolidays ] = useState<{ [key: string]: boolean}>({});


  useEffect(() => {
    localStorage.setItem(`todos_${currentUser}`, JSON.stringify(todos));
  }, [todos, currentUser]);

  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos_${currentUser}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [currentUser]);


  const addTodo = (date: Date, todo: ToDo) => {
    const dateString = date.toISOString().split('T')[0];
    setTodos((prevTodos: { [x: string]: { [x: string]: any; }; }) => ({
      ...prevTodos, [currentUser]: {
        ...prevTodos[currentUser],
        [dateString]: [...(prevTodos[currentUser][dateString] || []), todo],
      }  
    }));
  };

  const removeTodo = (date: Date, index: number) => {
    const dateString= date.toISOString().split('T')[0];
    setTodos((prevTodos: { [x: string]: any; }) => {
      const userTodos = {...prevTodos[currentUser]};
      if (userTodos[dateString]) {
        userTodos[dateString] = userTodos[dateString].filter((_: any, i: number) => i !== index);
      }
      return { ...prevTodos, [currentUser]: userTodos };
    });
  };

  const toggleModal = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(!isModalOpen);
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUser = e.target.value;
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', newUser);
  };

  return (
    <>
    <h1>Календарь и список задач</h1>
    <select value={currentUser} onChange={handleUserChange}>
      {users.map((user) => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
      <Calendar 
        selectedDate={selectedDate} 
        onDateClick={toggleModal} 
        todos={todos[currentUser]}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <TodoList 
            date={selectedDate}
            todos={todos[currentUser][selectedDate.toISOString().split('T')[0]] || []} 
            addTodo={(todo: ToDo) => addTodo(selectedDate, todo)} 
            removeTodo={(index: number) => removeTodo(selectedDate, index)}
          />
      </Modal>
      )}  
    </>
  );
}

export default App;
