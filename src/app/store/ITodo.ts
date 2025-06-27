export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoState {
  todos: ITodo[];
}

export interface IAppState {
  todos: ITodoState;
}
