import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { AdminService } from '../../services/admin.service';
import { Judge } from '../../interfaces/judge';
import { NewJudgeComponent } from './new-judge/new-judge.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SendEmailDialogComponent } from './send-email-dialog/send-email-dialog.component';

@Component({
  selector: 'judges',
  templateUrl: './judges.component.html',
  styleUrls: ['./judges.component.css'],
})
export class JudgesComponent implements OnInit {
  isLoading = true;

  judges$: BehaviorSubject<Judge[]>;

  columns = [
    `name`, `email`,
    `category`, `actions`
  ];

  constructor(
    private service: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getJudges();
  }

  getJudges() {
    this.judges$ = this.service.judges$;
    this.service.getJudges();
  }

  createJudge() {
    this.dialog.open(NewJudgeComponent, { width: `50%` });
  }

  deleteUser(judge: Judge) {
    this.dialog.open(DeleteConfirmationComponent, { width: `50%`, data: judge });
  }

  sendEmail(judge: Judge) {
    this.dialog.open(SendEmailDialogComponent, { width: `50%`, data: judge });
  }

  sendEmailToAll() {
    const data: Judge = { name: `All`, email: `all`, category: `General` };
    this.dialog.open(SendEmailDialogComponent, { width: `50%`, data });
  }
}
