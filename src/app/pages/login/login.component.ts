import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  error?: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ token }) => {
      if (token) {
        this.auth.loginWithToken(token)
          .subscribe({
            next: () => this.router.navigate(['/']),
            error: err => console.error(err),
            complete: () => console.log(`complete()`)
          });
      }
    });

    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onLogin() {
    this.auth.login(this.username, this.password)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: err => this.error = err.error?.message || err.message,
        complete: () => console.log(`complete()`)
      });
  }

}
