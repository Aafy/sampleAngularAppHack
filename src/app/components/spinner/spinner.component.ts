import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
  loading$ = new BehaviorSubject<boolean>(true);
  ngOnInit(): void {
    setTimeout(() => {
      this.loading$.next(false);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }
}
