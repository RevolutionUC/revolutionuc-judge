import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegistrantsComponent } from './pages/registrants/registrants.component';
import { UsersComponent } from './pages/users/users.component';


export enum Roles {
  ADMIN = 'ADMIN',
  JUDGE = 'JUDGE'
}


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   userRoles: [Roles.ADMIN]
        // }
      },
      {
        path: 'judge',
        component: UsersComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   userRoles: [Roles.JUDGE]
        // }
      }
    ]
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: !environment.production }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
