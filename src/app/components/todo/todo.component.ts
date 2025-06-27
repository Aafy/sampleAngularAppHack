import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState, ITodo } from '../../store/ITodo';
import { Observable, tap } from 'rxjs';
import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  toggleTodo,
} from '../../store/todo.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}
  todos$: Observable<ITodo[]>;
  newTodo = '';
  hasCompletedTodo$: Observable<boolean>;
  remainingTodoCount$: Observable<number>;
  ngOnInit() {
    this.todos$ = this.store.pipe(
      select((state: IAppState) => state.todos.todos),
      tap(console.log)
    ); // name which is used in config
    this.remainingTodoCount$ = this.store.pipe(
      select(
        (state: IAppState) =>
          state.todos.todos.filter((todo) => !todo.completed).length
      )
    );
    this.hasCompletedTodo$ = this.store.pipe(
      select((state: IAppState) =>
        state.todos.todos.some((todo) => todo.completed)
      )
    );
  }

  addTodo() {
    this.store.dispatch(
      addTodo({
        title: this.newTodo.trim(),
      })
    );
    this.newTodo = '';
  }

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  onClearCompleted(): void {
    this.store.dispatch(clearCompletedTodos());
  }
}
