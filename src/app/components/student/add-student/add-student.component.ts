import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../../services/students.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss',
})
export class AddStudentComponent {
  showMessage = false;
  addStudentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(private studentService: StudentsService) {}
  dismissMessage() {
    this.showMessage = false;
  }
  save() {
    this.studentService
      .addStudent(this.addStudentForm.value)
      .pipe(
        tap(() => {
          this.showMessage = true;
          this.addStudentForm.reset();
        })
      )
      .subscribe();
  }
}
