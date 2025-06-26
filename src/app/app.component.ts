import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CasingPipe } from './pipes/casing.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    CasingPipe,
    HighlightDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sample-angular-app';

  hideContainer = false;
  constructor(private router: Router) {}

  showInput() {
    this.router.navigate(['/search']);
  }
}
