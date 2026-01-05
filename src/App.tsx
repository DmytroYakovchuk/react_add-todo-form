import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './api/todos';

export const App: React.FC = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }

    if (!userId) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const user = usersFromServer.find(u => u.id === userId)!;
    const maxId = todos.length ? Math.max(...todos.map(t => t.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9 ]/g,
      '',
    );

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
            data-cy="titleInput"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
