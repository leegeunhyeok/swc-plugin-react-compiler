import { useMemo, useState } from 'react';
import { TodoFilters } from './components/TodoFilters';
import { TodoFooter } from './components/TodoFooter';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { initialTodos } from './data';
import './styles.css';
import type { Filter } from './types';

export function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.done);
    }
    if (filter === 'done') {
      return todos.filter((todo) => todo.done);
    }
    return todos;
  }, [filter, todos]);

  const activeCount = todos.filter((todo) => !todo.done).length;

  function addTodo() {
    const title = draft.trim();
    if (!title) {
      return;
    }

    setTodos((items) => [{ id: Date.now(), title, done: false }, ...items]);
    setDraft('');
  }

  function toggleTodo(id: number) {
    setTodos((items) =>
      items.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function deleteTodo(id: number) {
    setTodos((items) => items.filter((todo) => todo.id !== id));
  }

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-labelledby="todo-title">
        <header className="todo-header">
          <h1 id="todo-title">Todo</h1>
        </header>

        <TodoForm value={draft} onChange={setDraft} onSubmit={addTodo} />
        <TodoFilters value={filter} onChange={setFilter} />
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
        <TodoFooter activeCount={activeCount} />
      </section>
    </main>
  );
}
