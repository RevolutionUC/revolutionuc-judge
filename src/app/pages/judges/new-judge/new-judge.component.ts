import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-judge.component.html',
  styleUrls: ['./new-judge.component.css']
})
export class NewJudgeComponent implements OnInit {
  newJudge = new FormGroup({
    name: new FormControl(``),
    email: new FormControl(``),
    category: new FormControl(``)
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
      console.log(this.newJudge.value);
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
