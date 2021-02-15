import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './services/http_interceptor';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { JudgesModule } from './pages/judges/judges.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { SubmissionsModule } from './pages/submissions/submissions.module';
import { AssignmentModule } from './pages/assignment/assignment.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ProjectsModule,
    JudgesModule,
    AssignmentModule,
    SubmissionsModule
  ],
  entryComponents: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
