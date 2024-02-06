import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'new-judge',
  templateUrl: './new-judge.component.html',
  styleUrls: ['./new-judge.component.css']
})
export class NewJudgeComponent implements OnInit {
  newJudge = new UntypedFormGroup({
    name: new UntypedFormControl(``),
    email: new UntypedFormControl(``),
    category: new UntypedFormControl(``)
  });

  isSubmitting = false;
  error = false;

  categories: Category[] = [];

  constructor(
    private service: AdminService,
    public ref: MatDialogRef<NewJudgeComponent>,
  ) {}

  ngOnInit() {
    this.service.getCategories().subscribe(categories => this.categories = categories);
  }

  closeDialog() {
    this.ref.close();
  }

  onSubmit() {
    if (this.newJudge.valid) {
      this.isSubmitting = true;
      this.error = false;
      this.service.createJudge(this.newJudge.value).subscribe({
        next: () => {
          this.closeDialog();
        },
        error: err => {
          this.error = true;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
