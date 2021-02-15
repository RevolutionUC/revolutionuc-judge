import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Judge } from '../interfaces/judge';
import { tap } from 'rxjs/operators';
import { Category } from '../interfaces/category';
import { SendEmailDto } from '../interfaces/email';

@Injectable({
  providedIn: 'root'
})
export class JudgeService {
  private BASE_URL = `${environment.BASE_URL}/judge`;

  judge: Judge = null;

  constructor(private http: HttpClient) {}

  getJudge() {
    return this.http.get<Judge>(`${this.BASE_URL}/me`);
  }

  rankSubmissions(rankings: Array<string>) {
    return this.http.put<Judge>(`${this.BASE_URL}/rankings`, { rankings });
  }

  submitRanking() {
    return this.http.put<void>(`${this.BASE_URL}/isFinal`, {});
  }
}
