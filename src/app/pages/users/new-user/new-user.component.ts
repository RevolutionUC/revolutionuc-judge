import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SudoService } from '../../../services/sudo.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  newUser = new FormGroup({
    username: new FormControl(``),
    password: new FormControl(``),
    role: new FormControl(``)
  })

  isSubmitting = false

  error = false

  constructor(
    private service: SudoService,
    public ref: MatDialogRef<NewUserComponent>,
  ) {}

  closeDialog() {
    this.ref.close();
  }

  onSubmit() {
    if(this.newUser.valid) {
      this.isSubmitting = true;
      this.error = false;
      this.service.createUser(this.newUser.value).subscribe({
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
