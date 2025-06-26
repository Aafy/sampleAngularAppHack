import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  url = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get(this.url);
  }

  getStudentById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  addStudent(student: any) {
    return this.http.post(this.url, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  editStudent(id: string, student: any) {
    return this.http.put(`${this.url}/${id}`, student);
  }
}
