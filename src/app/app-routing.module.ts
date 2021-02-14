import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegistrantsComponent } from './pages/registrants/registrants.component';
import { JudgingComponent } from './pages/judging/judging.component';
import { JudgesComponent } from './pages/judges/judges.component';
import { ConfigComponent } from './pages/config/config.component';


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
        component: JudgesComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   userRoles: [Roles.ADMIN]
        // }
      },
      {
        path: 'judging',
        component: JudgingComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   userRoles: [Roles.ADMIN]
        // }
      },
      {
        path: 'judges',
        component: JudgesComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   userRoles: [Roles.ADMIN]
        // }
      },
      {
        path: 'config',
        component: ConfigComponent,
        // canActivate: [AuthGuard],
        // data: {
        //   userRoles: [Roles.ADMIN]
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
