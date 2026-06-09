import type { FormEvent } from 'react';

type TodoFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function TodoForm({ value, onChange, onSubmit }: TodoFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input">New task</label>
      <div>
        <input
          id="todo-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
