import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Judge } from '../interfaces/judge';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SudoService {
  private BASE_URL: string = `${environment.BASE_URL}/sudo`;

  // users$ = new BehaviorSubject<User[]>([]);
  judges$ = new BehaviorSubject<Judge[]>([]);

  constructor(private http: HttpClient) {}

  // getUsers() {
  //   this.http.get<User[]>(`${this.BASE_URL}/users`).subscribe(users => {
  //     this.users$.next(users);
  //   });
  // }

  getJudges() {
    this.http.get<Judge[]>(`${this.BASE_URL}/judges`).subscribe(judges => {
      this.judges$.next(judges);
    });
  }

  // createUser(user: User) {
  //   return this.http.post<User>(`${this.BASE_URL}/users`, user).pipe(
  //     tap(() => this.getUsers())
  //   );
  // }

  createJudge(judge: Judge) {
    return this.http.post<User>(`${this.BASE_URL}/judges`, judge).pipe(
      tap(() => this.getJudges())
    );
  }

  // deleteUser(id: string) {
  //   return this.http.delete<void>(`${this.BASE_URL}/users/${id}`).pipe(
  //     tap(() => this.getUsers())
  //   );
  // }

  deleteJudge(id: string) {
    return this.http.delete<void>(`${this.BASE_URL}/judges/${id}`).pipe(
      tap(() => this.getJudges())
    );
  }
}
