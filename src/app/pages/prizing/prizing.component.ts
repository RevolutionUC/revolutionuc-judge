import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Group } from '../../interfaces/judge';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'prizing',
  templateUrl: './prizing.component.html',
  styleUrls: ['./prizing.component.css'],
})
export class AssignmentComponent implements OnInit {
  isLoading = true;
  isWorking = false;
  error: string;
  groups: Group[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.isLoading = true;
    this.adminService.getGroups().subscribe({
      next: groups => {
        groups.sort(this.sortGroups);
        this.groups = groups;
        this.isLoading = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.isLoading = false;
      }
    });
  }

  initiateAssignment() {
    this.isWorking = true;
    this.adminService.initiateAssignment().subscribe({
      next: groups => {
        groups.sort(this.sortGroups);
        this.groups = groups;
        this.isWorking = false;
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.isWorking = false;
      }
    });
  }

  private sortGroups(a: Group, b: Group): number {
    if (a.name > b.name) { return 1; }
    if (a.name < b.name) { return -1; }
    return 0;
  }

}
