import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from './interfaces/user';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(`canActivate()`);

    if (this.authService.isUserLoggedIn()) {
      const userRole = this.authService.user.role;
      const requiredRole: Role = route.data.requiredRole;

      if (!requiredRole || userRole === requiredRole) {
        return true;
      }
      this.router.navigate(['']);
      return;
    }
    this.router.navigate(['/login']);
    return;
  }
}
