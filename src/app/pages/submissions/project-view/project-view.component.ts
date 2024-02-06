import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
})
export class ProjectViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project,
    public ref: MatDialogRef<ProjectViewComponent>
  ) {}

  closeDialog() {
    this.ref.close();
  }
}
