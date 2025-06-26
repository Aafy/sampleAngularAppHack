import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Subject, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [CommonModule, RouterModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit, OnDestroy {
  students$ = new Subject<any[]>();
  constructor(private studentService: StudentsService) {}
  ngOnInit() {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students$.next(data);
    });
  }

  deleteStudent(id: string): void {
    this.studentService
      .deleteStudent(id)
      .pipe(switchMap(() => this.studentService.getAllStudents()))
      .subscribe((data: any) => this.students$.next(data));
  }

  editStudent(id: string): void {
    // this.studentService
  }

  ngOnDestroy(): void {
    // this.studentSubs$.unsubscribe //
  }
}
