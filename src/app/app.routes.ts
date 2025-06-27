import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'spinner',
    loadComponent: () =>
      import('./components/spinner/spinner.component').then(
        (m) => m.SpinnerComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./components/button/button.component').then(
        (m) => m.ButtonComponent
      ),
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./components/student/student.component').then(
        (m) => m.StudentComponent
      ),
  },
  {
    path: 'toast',
    loadComponent: () =>
      import('./components/toast/toast.component').then(
        (m) => m.ToastComponent
      ),
  },
  {
    path: 'addStudent',
    loadComponent: () =>
      import('./components/student/add-student/add-student.component').then(
        (m) => m.AddStudentComponent
      ),
  },
  {
    path: 'editStudent/:studentId',
    loadComponent: () =>
      import('./components/student/edit-student/edit-student.component').then(
        (m) => m.EditStudentComponent
      ),
  },
  {
    path: 'todo',
    loadComponent: () =>
      import('./components/todo/todo.component').then((m) => m.TodoComponent),
  },
];
