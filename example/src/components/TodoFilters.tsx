import type { Filter } from '../types';

const filters: Filter[] = ['all', 'active', 'done'];

type TodoFiltersProps = {
  value: Filter;
  onChange: (filter: Filter) => void;
};

export function TodoFilters({ value, onChange }: TodoFiltersProps) {
  return (
    <div className="todo-toolbar" aria-label="Todo filters">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={value === filter ? 'selected' : undefined}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
