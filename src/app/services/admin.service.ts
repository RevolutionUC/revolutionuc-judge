import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Group, Judge } from '../interfaces/judge';
import { tap } from 'rxjs/operators';
import { Category } from '../interfaces/category';
import { SendEmailDto } from '../interfaces/email';
import { Project } from '../interfaces/project';
import { Submission } from '../interfaces/submission';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BASE_URL = `${environment.BASE_URL}/admin`;

  judges$ = new BehaviorSubject<Judge[]>([]);

  constructor(private http: HttpClient) {}

  getJudges() {
    this.http.get<Judge[]>(`${this.BASE_URL}/judge`).subscribe(judges => {
      console.log({ judges });
      this.judges$.next(judges);
    });
  }

  createJudge(judge: Judge) {
    return this.http.post<Judge>(`${this.BASE_URL}/judge`, judge).pipe(
      tap(() => this.getJudges())
    );
  }

  deleteJudge(id: string) {
    return this.http.delete<void>(`${this.BASE_URL}/judge/${id}`).pipe(
      tap(() => this.getJudges())
    );
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.BASE_URL}/category`);
  }

  sendEmail(payload: SendEmailDto) {
    return this.http.post<void>(`${this.BASE_URL}/judge/email`, payload);
  }

  getProjects() {
    return this.http.get<Array<Project>>(`${this.BASE_URL}/project`);
  }

  uploadDevpostCsv(file: File) {
    const formData = new FormData();
    formData.append(`file`, file, `submissions.csv`);
    return this.http.post<Array<Submission>>(`${this.BASE_URL}/devpost`, formData);
  }

  getGroups() {
    return this.http.get<Array<Group>>(`${this.BASE_URL}/group`).pipe(
      tap(data => console.log({ data }))
    );
  }

  initiateAssignment() {
    return this.http.post<Array<Group>>(`${this.BASE_URL}/assignment`, {}).pipe(
      tap(data => console.log({ data }))
    );
  }

  getPrizingInfo() {
    return this.http.get<Array<Submission>>(`${this.BASE_URL}/prizing`, {}).pipe(
      tap(data => console.log({ data }))
    );
  }

  initiateScoring() {
    return this.http.post<void>(`${this.BASE_URL}/prizing`, {});
  }
}
