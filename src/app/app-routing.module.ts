import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';

import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { JudgesComponent } from './pages/judges/judges.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SubmissionsComponent } from './pages/submissions/submissions.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';

enum Roles { ADMIN = 'ADMIN', JUDGE = 'JUDGE' }

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'judges',
        component: JudgesComponent,
        canActivate: [AuthGuard],
        data: {
          requiredRole: Roles.ADMIN
        }
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard],
        data: {
          requiredRole: Roles.ADMIN
        }
      },
      {
        path: 'assignment',
        component: AssignmentComponent,
        canActivate: [AuthGuard],
        data: {
          requiredRole: Roles.ADMIN
        }
      },
      {
        path: 'submissions',
        component: SubmissionsComponent,
        canActivate: [AuthGuard],
        data: {
          requiredRole: Roles.JUDGE
        }
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
