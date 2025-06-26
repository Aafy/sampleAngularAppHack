import { Component } from '@angular/core';
import { CasingPipe } from '../../pipes/casing.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-home',
  imports: [CasingPipe, HighlightDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
