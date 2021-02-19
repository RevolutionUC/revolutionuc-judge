import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Submission } from 'src/app/interfaces/submission';
import { JudgeService } from 'src/app/services/judge.service';

export interface FinalizeData { totalSubmissions: number; rankings: Array<Submission>; cb: () => void; }

@Component({
  selector: 'finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css'],
})
export class FinalizeComponent implements OnInit {
  canSubmit = false;
  isSubmitting = false;
  submitButtonText = `Submit`;
  submitButtonColor: ThemePalette = `primary`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FinalizeData,
    public ref: MatDialogRef<FinalizeComponent>,
    private service: JudgeService
  ) {}

  ngOnInit() {
    if (this.data.rankings.findIndex(s => s.project.disqualified) !== -1) {
      this.submitButtonColor = `warn`;
      this.submitButtonText = `One or more of your ranked projects have been disqualified`;
      return;
    }
    if (this.data.rankings.length > 5) {
      this.submitButtonColor = `warn`;
      this.submitButtonText = `Please only rank your top 5`;
      return;
    }
    if (this.data.rankings.length < 5) {
      if (this.data.rankings.length === this.data.totalSubmissions) {
        this.canSubmit = true;
        return;
      }
      this.submitButtonColor = `warn`;
      this.submitButtonText = `Please rank at-least 5 projects`;
      return;
    }

    this.canSubmit = true;
  }

  submitRanking() {
    this.isSubmitting = true;
    this.service.submitRanking().subscribe({
      next: () => {
        this.isSubmitting = false;
        this.ref.close();
        this.data.cb();
      },
      error: err => {
        this.isSubmitting = false;
        this.submitButtonColor = `warn`;
        this.submitButtonText = err.error?.message || err.message;
        this.canSubmit = false;
      }
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
