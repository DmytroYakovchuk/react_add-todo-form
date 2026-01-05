import { TodoInfo } from '../TodoInfo';
import type { Todo as ApiTodo } from '../../api/todos';
import type { User } from '../../api/users';

type TodoWithUser = ApiTodo & {
  user: User;
};

interface Props {
  todos: TodoWithUser[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
