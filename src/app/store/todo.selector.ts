import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, ITodoState } from './ITodo';

export const selectTodoState = createFeatureSelector<ITodoState>('todos');

export const selectTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);
export const selectTodosLoadingState = createSelector(
  selectTodoState,
  (state) => state.loading
);
export const selectCompletedTodoCount = createSelector(
  selectTodoState,
  (state) => state.todos.filter((todo) => todo.completed).length
);
