import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionsComponent } from './submissions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectViewComponent } from './project-view/project-view.component';
import { FinalizeComponent } from './finalize/finalize.component';

@NgModule({
    declarations: [
        SubmissionsComponent,
        ProjectViewComponent,
        FinalizeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTableModule,
        DragDropModule
    ],
    providers: []
})
export class SubmissionsModule {}
