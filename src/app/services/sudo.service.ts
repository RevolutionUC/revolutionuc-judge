import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SudoService {
  private BASE_URL: string = `${environment.BASE_URL}/sudo`;

  users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<User[]>(`${this.BASE_URL}/users`).subscribe(users => {
      this.users$.next(users);
    });
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.BASE_URL}/users`, user).pipe(
      tap(() => this.getUsers())
    );
  }

  deleteUser(id: string) {
    return this.http.delete<void>(`${this.BASE_URL}/users/${id}`).pipe(
      tap(() => this.getUsers())
    );
  }
}
