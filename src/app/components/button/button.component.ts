import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  loadingState$ = new BehaviorSubject<boolean>(true);

  showLoading() {
    this.loadingState$.next(true);
  }

  stopLoading() {
    this.loadingState$.next(false);
  }

  ngOnDestroy() {
    this.loadingState$.unsubscribe();
  }
}
