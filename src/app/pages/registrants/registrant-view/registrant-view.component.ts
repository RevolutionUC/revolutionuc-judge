import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { Registrant, RegistrantLite } from '../../../interfaces/registrant';
import { RegistrantsService } from '../registrants.service';
import { SendEmailDialogComponent } from '../send-email-dialog/send-email-dialog.component';

@Component({
  selector: 'registrant-view',
  templateUrl: './registrant-view.component.html',
  styleUrls: ['./registrant-view.component.css'],
})
export class RegistrantViewComponent implements OnInit {
  registrant: Registrant;
  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public reg: RegistrantLite,
    public ref: MatDialogRef<RegistrantViewComponent>,
    private dialog: MatDialog,
    private service: RegistrantsService
  ) {}

  ngOnInit() {
    this.service.getRegistrant(this.reg.id).pipe(
      map(registrant => ({
        ...registrant,
        dateOfBirth: new Date(registrant.dateOfBirth).toLocaleDateString()
      }))
    ).subscribe(registrant => this.registrant = registrant);
  }

  sendEmail() {
    this.dialog.open(SendEmailDialogComponent, { width: `50%`, data: this.registrant.email });
  }

  closeDialog() {
    this.ref.close();
  }
}
