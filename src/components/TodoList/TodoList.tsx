interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a className="UserInfo" href={`mailto:${todo.user.email}`}>
            {todo.user.name}
          </a>
        </article>
      ))}
    </section>
  );
};
