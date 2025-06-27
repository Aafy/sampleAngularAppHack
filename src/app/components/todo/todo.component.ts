import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState, ITodo } from '../../store/ITodo';
import { Observable, tap } from 'rxjs';
import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  loadTodos,
  toggleTodo,
} from '../../store/todo.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  selectTodos,
  selectTodosLoadingState,
} from '../../store/todo.selector';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(private store: Store<IAppState>) {
    this.todos$ = this.store.pipe(select(selectTodos));
    this.loading$ = this.store.pipe(select(selectTodosLoadingState));
    this.remainingTodosCount$ = this.store.pipe(
      select(
        (state: IAppState) =>
          state.todos.todos.filter((todo) => !todo.completed).length
      )
    );
    this.hasCompletedTodos$ = this.store.pipe(
      select((state: IAppState) =>
        state.todos.todos.some((todo) => todo.completed)
      )
    );
  }
  todos$: Observable<ITodo[]>;
  newTodo = '';
  hasCompletedTodos$: Observable<boolean>;
  remainingTodosCount$: Observable<number>;
  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  onAddTodo() {
    this.store.dispatch(
      addTodo({
        title: this.newTodo.trim(),
      })
    );
    this.newTodo = '';
  }

  onDeleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }

  onToggleTodo(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  onClearCompleted(): void {
    this.store.dispatch(clearCompletedTodos());
  }
}
