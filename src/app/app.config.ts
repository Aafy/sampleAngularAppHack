import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './store/todo.reducer';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      todos: todoReducer,
    }),
    provideEffects(TodoEffects),
  ],
};
