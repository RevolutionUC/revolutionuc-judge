import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { Judge } from '../../../interfaces/judge';
import { SudoService } from '../../../services/sudo.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  isSubmitting = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public judge: Judge,
    private service: SudoService,
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
