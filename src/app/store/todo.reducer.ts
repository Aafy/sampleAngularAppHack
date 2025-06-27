import { createReducer, on } from '@ngrx/store';
import { ITodo, ITodoState } from './ITodo';
import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  loadTodos,
  loadTodosSuccess,
  toggleTodo,
} from './todo.action';

export const initialState: ITodoState = { todos: [], loading: false };

export const todoReducer = createReducer(
  initialState,

  on(addTodo, (state: ITodoState, action: { title: string }) => {
    const todos = [...state.todos];
    const newTodo: ITodo = {
      title: action.title,
      id: todos.length + 1,
      completed: false,
      userId: 1,
    };
    return { ...state, todos: [...todos, newTodo] };
  }),
  on(deleteTodo, (state: ITodoState, action: { id: number }) => {
    const todos = state.todos;
    const todosA = todos.filter((todo: ITodo) => todo.id !== action.id);

    return { ...state, todos: todosA };
  }),
  on(toggleTodo, (state, action: { id: number }) => {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ),
    };
  }),
  on(clearCompletedTodos, (state: ITodoState) => {
    return { ...state, todos: state.todos.filter((todo) => !todo.completed) };
  }),
  on(loadTodos, (state: ITodoState) => {
    return { ...state, loading: true };
  }),
  on(loadTodosSuccess, (state: ITodoState, action: { todos: ITodo[] }) => {
    return { ...state, todos: action.todos, loading: false };
  })
);
