import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { SudoService } from '../../services/sudo.service';
import { User } from '../../interfaces/user';
import { Judge } from '../../interfaces/judge';
import { NewJudgeComponent } from './new-judge/new-judge.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'judges',
  templateUrl: './judges.component.html',
  styleUrls: ['./judges.component.css'],
})
export class JudgesComponent implements OnInit {
  isLoading = true;

  // users$: BehaviorSubject<User[]>
  judges$: BehaviorSubject<Judge[]>

  columns = [
    `name`,
    `email`,
    `category`
  ];

  constructor(
    private service: SudoService,
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

  deleteJudge(judge: Judge) {
    this.dialog.open(DeleteConfirmationComponent, { width: `50%`, data: judge });
  }
}
