import { Routes } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'spinner',
    component: SpinnerComponent,
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
];
