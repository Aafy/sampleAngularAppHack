import { createReducer, on } from '@ngrx/store';
import { ITodo, ITodoState } from './ITodo';
import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  toggleTodo,
} from './todo.action';

export const initialState: ITodoState = { todos: [] };

export const todoReducer = createReducer(
  initialState,

  on(addTodo, (state: ITodoState, action: { title: string }) => {
    const todos = [...state.todos];
    const newTodo: ITodo = {
      title: action.title,
      id: todos.length + 1,
      completed: false,
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
  })
);
