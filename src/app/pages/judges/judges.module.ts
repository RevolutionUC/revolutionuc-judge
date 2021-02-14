import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JudgesComponent } from './judges.component';
import { NewJudgeComponent } from './new-judge/new-judge.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    JudgesComponent,
    NewJudgeComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
  ],
  entryComponents: [
    NewJudgeComponent,
    DeleteConfirmationComponent,
  ],
  providers: []
})
export class JudgesModule {}
