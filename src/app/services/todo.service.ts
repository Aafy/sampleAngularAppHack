import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../store/ITodo';
import { deleteTodo } from '../store/todo.action';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  getAllTodos() {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
