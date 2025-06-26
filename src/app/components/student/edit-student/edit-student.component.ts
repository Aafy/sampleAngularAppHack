import { Component } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss',
})
export class EditStudentComponent {
  showMessage = false;
  editStudentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  studentId: string = '';
  constructor(
    private studentService: StudentsService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.studentId = this.router.snapshot.params['studentId'];
    this.studentService
      .getStudentById(this.studentId)
      .pipe(
        tap((student: any) => {
          this.editStudentForm.patchValue({
            name: student.name,
            email: student.email,
          });
        })
      )

      .subscribe();
  }
  dismissMessage() {
    this.showMessage = false;
  }

  edit() {
    this.studentService
      .editStudent(this.studentId, this.editStudentForm.value)
      .pipe(
        tap(() => {
          this.showMessage = true;
          this.editStudentForm.reset();
        })
      )
      .subscribe();
  }
}
