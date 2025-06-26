import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
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

  communicationOptions = ['SMS', 'EMAIL', 'CALL'];

  addStudentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl('Male'),
    communications: new FormArray([]),
  });
  constructor(private studentService: StudentsService) {
    this.addCheckBoxes();
  }

  get communicationArray() {
    return this.addStudentForm.get('communications') as FormArray;
  }

  addCheckBoxes() {
    this.communicationOptions.forEach(() =>
      this.communicationArray.push(new FormControl(false))
    );
  }

  dismissMessage() {
    this.showMessage = false;
  }
  save() {
    const selectedMethods = this.addStudentForm.value.communications
      ?.map((checked: boolean, i: number) =>
        checked ? this.communicationOptions[i] : null
      )
      .filter((v: string | null) => v !== null);

    this.studentService
      .addStudent({
        ...this.addStudentForm.value,
        communications: selectedMethods,
      })
      .pipe(
        tap(() => {
          this.showMessage = true;
          this.addStudentForm.reset();
        })
      )
      .subscribe();
  }
}
