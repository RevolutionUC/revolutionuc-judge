import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Project } from '../../interfaces/project';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { QualifyProjectComponent, QualifyProjectData } from './qualify-project/qualify-project.component';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Array<Project> | null>;
  getProjectsError$ = new BehaviorSubject<boolean>(false);

  file: File;

  isUploading = false;

  columns = [
    `index`,
    `title`,
    `submitter`,
    `categories`,
    `actions`,
  ];

  numCheckedIn: number;

  constructor(private service: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projects$ = this.service.getProjects().pipe(
      map(projects => {
        return projects.map<Project>(project => {
          const categories = project.submissions.map(s => s.category.name.substr(0, 20)).join(`, `);
          return { ...project, categories };
        });
      }),
      catchError(err => {
        console.error(err);
        this.getProjectsError$.next(true);
        return of(null);
      })
    );
  }

  onFileSelect(file: File) {
    this.file = file;
  }

  uploadFile() {
    this.isUploading = true;
    this.service.uploadDevpostCsv(this.file).subscribe({
      complete: () => {
        this.isUploading = false;
        this.file = null;
        this.getProjects();
      },
      error: err => {
        console.error(err);
        this.isUploading = false;
        alert(`Error uploading file: ${err.message}`);
        return of(null);
      }
    });
  }

  qualifyProject(project: Project, disqualified: boolean) {
    const data: QualifyProjectData = {
      project, disqualified,
      cb: () => this.getProjects()
    };
    this.dialog.open(QualifyProjectComponent, { width: `50%`, data });
  }
}
