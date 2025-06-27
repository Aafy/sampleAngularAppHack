export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface ITodoState {
  todos: ITodo[];
  loading: boolean;
}

export interface IAppState {
  todos: ITodoState;
}
