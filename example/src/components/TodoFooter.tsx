type TodoFooterProps = {
  activeCount: number;
};

export function TodoFooter({ activeCount }: TodoFooterProps) {
  return (
    <footer className="todo-footer">
      <strong>{activeCount}</strong>
      <span>{activeCount === 1 ? 'task' : 'tasks'} left</span>
    </footer>
  );
}
