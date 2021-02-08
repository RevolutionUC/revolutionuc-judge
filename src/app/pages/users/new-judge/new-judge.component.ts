import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SudoService } from '../../../services/sudo.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-judge.component.html',
  styleUrls: ['./new-judge.component.css']
})
export class NewJudgeComponent {
  newJudge = new FormGroup({
    name: new FormControl(``),
    email: new FormControl(``),
    category: new FormControl(``)
  })

  isSubmitting = false

  error = false

  constructor(
    private service: SudoService,
    public ref: MatDialogRef<NewJudgeComponent>,
  ) {}

  closeDialog() {
    this.ref.close();
  }

  onSubmit() {
    if(this.newJudge.valid) {
      this.isSubmitting = true;
      this.error = false;
      this.service.createJudge(this.newJudge.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.closeDialog();
        },
        error: err => {
          this.isSubmitting = false;
          this.error = true;
        }
      });
    }
  }
}
