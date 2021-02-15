import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Login, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = environment.BASE_URL;

  private tokenStorageKey = `token`;
  token: string = null;

  private userStorageKey = `user`;
  user: User = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(this.tokenStorageKey);
    this.user = JSON.parse(localStorage.getItem(this.userStorageKey));
  }

  login(username: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.BASE_URL}/auth/login`, { username, password }).pipe(
      tap(({ token, user }) => {
        localStorage.setItem(this.tokenStorageKey, token);
        this.token = token;

        if (user.role === `SUDO`) { user.role = `ADMIN`; }

        localStorage.setItem(this.userStorageKey, JSON.stringify(user));
        this.user = user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
    this.token = null;

    localStorage.removeItem(this.userStorageKey);
    this.user = null;
  }

  loginWithToken(token: string) {
    return this.http.get<User>(`${this.BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(user => {
        localStorage.setItem(this.tokenStorageKey, token);
        this.token = token;

        localStorage.setItem(this.userStorageKey, JSON.stringify(user));
        this.user = user;
      })
    );
  }

  getToken(): string {
    return this.token;
  }

  isUserLoggedIn(): boolean {
    return !!this.user;
  }
}
