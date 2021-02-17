import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { Submission } from 'src/app/interfaces/submission';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'prizing',
  templateUrl: './prizing.component.html',
  styleUrls: ['./prizing.component.css'],
})
export class PrizingComponent implements OnInit {
  isLoading = true;
  isWorking = false;
  indeterminateJudge = false;
  notStarted = false;
  error: string;

  submissions: Submission[] = [];
  categories: string[] = [];

  selectedCategory = `General`;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPrizingInfo();
  }

  getPrizingInfo() {
    this.clearState();
    this.adminService.getPrizingInfo().subscribe({
      next: submissions => {
        submissions.sort(this.sortSubmissions);
        this.submissions = submissions;
        this.categories = Array.from(new Set(submissions.map(s => s.category.name)));
        this.isLoading = false;
      },
      error: err => {
        console.log({ err });
        switch (err.status) {
          case 400:
            this.indeterminateJudge = true;
            break;
          case 404:
            this.notStarted = true;
            break;
          default:
            this.error = err.message;
        }
        this.isLoading = false;
      }
    });
  }

  initiateScoring() {
    this.isWorking = true;
    this.adminService.initiateScoring().subscribe({
      next: () => {
        this.getPrizingInfo();
      },
      error: err => {
        this.error = err.error?.message || err.message;
        this.isWorking = false;
      }
    });
  }

  getSubmissionsForSelectedCategory() {
    return this.submissions.filter(submission => {
      return submission.category.name === this.selectedCategory;
    });
  }

  private clearState() {
    this.isLoading = true;
    this.isWorking = false;
    this.indeterminateJudge = false;
    this.notStarted = false;
    this.error = null;
  }

  private sortSubmissions(a: Submission, b: Submission): number {
    if (a.category.name > b.category.name) { return 1; }
    if (a.category.name < b.category.name) { return -1; }
    return b.score - a.score;
  }

}
