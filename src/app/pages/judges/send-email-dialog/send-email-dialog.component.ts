import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Judge } from 'src/app/interfaces/judge';
import { AdminService } from 'src/app/services/admin.service';
import { SendEmailDto } from '../../../interfaces/email';

@Component({
  selector: 'send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.css'],
})
export class SendEmailDialogComponent {
  state: 'READY' | 'PENDING' | 'DONE' = `READY`;

  dryRun = new FormControl(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public judge: Judge,
    public ref: MatDialogRef<SendEmailDialogComponent>,
    private service: AdminService,
  ) {}

  sendEmail() {
    const payload: SendEmailDto = {
      template: `postEmailJudgeEmail`,
      recipent: this.judge.email,
      dryRun: this.dryRun.value
    };
    this.state = `PENDING`;

    this.service.sendEmail(payload).subscribe(() => {
      this.state = `DONE`;
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
