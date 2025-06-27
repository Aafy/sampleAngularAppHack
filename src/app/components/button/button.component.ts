import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnDestroy {
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
