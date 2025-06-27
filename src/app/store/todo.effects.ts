import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { loadTodos, loadTodosSuccess } from './todo.action';
import { ITodo } from './ITodo';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class TodoEffects {
  actions$ = inject(Actions);

  constructor(private todoService: TodoService) {}

  loadToDo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService
          .getAllTodos()
          .pipe(map((todos: ITodo[]) => loadTodosSuccess({ todos })))
      )
    )
  );
}
