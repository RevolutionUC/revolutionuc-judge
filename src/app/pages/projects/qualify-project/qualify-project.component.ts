import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { Project } from 'src/app/interfaces/project';
import { AdminService } from '../../../services/admin.service';

export interface QualifyProjectData {
  project: Project;
  disqualified: boolean;
  cb: () => void;
}

@Component({
  selector: 'qualify-project',
  templateUrl: './qualify-project.component.html',
  styleUrls: ['./qualify-project.component.css']
})
export class QualifyProjectComponent {
  isSubmitting = false;
  error = false;

  reason: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QualifyProjectData,
    private service: AdminService,
    public ref: MatDialogRef<QualifyProjectComponent>,
  ) {}

  closeDialog() {
    this.ref.close();
  }

  onSubmit() {
      this.isSubmitting = true;
      this.error = false;
      const disqualified = this.data.disqualified ? this.reason : null;
      this.service.qualifyProject(this.data.project, disqualified).subscribe({
        next: () => {
          this.closeDialog();
          this.data.cb();
        },
        error: err => {
          this.error = true;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
