import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentComponent } from './assignment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { AssignmentService } from './assignment.service';

@NgModule({
  declarations: [
    AssignmentComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  entryComponents: [
  ],
  providers: [AssignmentService]
})
export class AssignmentModule {}
