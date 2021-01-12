import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SendEmailDto } from '../../../interfaces/email';
import { RegistrantsService } from '../registrants.service';

@Component({
  selector: 'send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.css'],
})
export class SendEmailDialogComponent {
  state: 'READY' | 'PENDING' | 'DONE' = `READY`;

  template = new FormControl(``);
  dryRun = new FormControl(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public email: string,
    public ref: MatDialogRef<SendEmailDialogComponent>,
    private registrantService: RegistrantsService
  ) {}

  sendEmail() {
    const payload: SendEmailDto = {
      template: this.template.value,
      recipent: this.email,
      dryRun: this.dryRun.value
    };
    this.state = `PENDING`;

    this.registrantService.sendEmail(payload).subscribe(() => {
      this.state = `DONE`;
    });
  }

  closeDialog() {
    this.ref.close();
  }
}
