import { Component } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
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
  communicationOptions = ['SMS', 'EMAIL', 'CALL'];
  editStudentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl('Male'),
    communications: new FormArray([]),
  });
  studentId: string = '';

  constructor(
    private studentService: StudentsService,
    private router: ActivatedRoute
  ) {
    this.addCheckBoxes();
  }
  get communicationArray() {
    return this.editStudentForm.get('communications') as FormArray;
  }

  addCheckBoxes() {
    this.communicationOptions.forEach(() =>
      this.communicationArray.push(new FormControl(false))
    );
  }
  ngOnInit(): void {
    this.studentId = this.router.snapshot.params['studentId'];
    this.studentService
      .getStudentById(this.studentId)
      .pipe(
        tap((student: any) => {
          this.editStudentForm.patchValue({
            name: student.name,
            email: student.email,
            gender: student.gender,
            communications: student.communications,
          });
        })
      )

      .subscribe();
  }
  dismissMessage() {
    this.showMessage = false;
  }

  edit() {
    const selectedMethods = this.editStudentForm.value.communications
      ?.map((checked: boolean, i: number) =>
        checked ? this.communicationOptions[i] : null
      )
      .filter((v: string | null) => v !== null);

    this.studentService
      .editStudent(this.studentId, {
        ...this.editStudentForm.value,
        communications: selectedMethods,
      })
      .pipe(
        tap(() => {
          this.showMessage = true;
          this.editStudentForm.reset();
        })
      )
      .subscribe();
  }
}
