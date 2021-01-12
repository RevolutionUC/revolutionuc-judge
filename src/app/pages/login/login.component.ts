import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).pipe(
      flatMap(() => from(this.router.navigate(['/'])))
    )
    .subscribe({
      next: p => {
        console.log(`next()`);
        // this.router.navigate(['/']);
      },
      error: err => console.error(err),
      complete: () => console.log(`complete()`)
    })
  }

}
