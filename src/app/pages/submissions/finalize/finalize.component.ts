import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Submission } from 'src/app/interfaces/submission';
import { JudgeService } from 'src/app/services/judge.service';

export interface FinalizeData { rankings: Array<Submission>; cb: () => void; }

@Component({
  selector: 'finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css'],
})
export class FinalizeComponent implements OnInit {
  canSubmit = false;
  submitButtonText = `Submit`;
  submitButtonColor: ThemePalette = `primary`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FinalizeData,
    public ref: MatDialogRef<FinalizeComponent>,
    private service: JudgeService
  ) {}

  ngOnInit() {
    if (this.data.rankings.length > 5) {
      this.submitButtonColor = `warn`;
      this.submitButtonText = `Please only rank your top 5`;
      return;
    }
    if (this.data.rankings.length < 5) {
      this.submitButtonColor = `warn`;
      this.submitButtonText = `Please rank at-least 5 projects`;
      return;
    }

    this.canSubmit = true;
  }

  submitRanking() {
    this.service.submitRanking().subscribe({
      next: () => {
        this.ref.close();
        this.data.cb();
      },
      error: err => console.error(err)
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
