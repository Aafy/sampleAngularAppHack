import { createAction, props } from '@ngrx/store';
import { ITodo } from './ITodo';
export const toggleTodo = createAction(
  '[Todo] - Toggle the Todo status',
  props<{ id: number }>()
);

export const addTodo = createAction(
  '[Todo] - Add Todo',
  props<{ title: string }>()
);

export const deleteTodo = createAction(
  '[Todo] - Delete Todo',
  props<{ id: number }>()
);

export const clearCompletedTodos = createAction(
  '[Todo] - Clear Completed Todos'
);

// API Actions

export const loadTodos = createAction('[Todo] - Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] - Load Todos Success',
  props<{ todos: ITodo[] }>()
);
