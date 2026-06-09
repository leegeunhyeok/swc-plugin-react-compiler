export type Filter = 'all' | 'active' | 'done';

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};
