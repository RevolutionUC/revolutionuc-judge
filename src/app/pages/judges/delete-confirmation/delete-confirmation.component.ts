import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { User } from '../../../interfaces/user';
import { Judge } from '../../../interfaces/judge';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public judge: Judge,
    private service: AdminService,
    public ref: MatDialogRef<DeleteConfirmationComponent>,
  ) {}

  closeDialog() {
    this.ref.close();
  }

  onSubmit() {
    this.isSubmitting = true;
    this.service.deleteJudge(this.judge.id).subscribe(() => {
      this.isSubmitting = false;
      this.closeDialog();
    });
  }
}
