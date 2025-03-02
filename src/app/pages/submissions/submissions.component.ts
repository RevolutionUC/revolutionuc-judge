import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';

import { Judge } from '../../interfaces/judge';
import { JudgeService } from 'src/app/services/judge.service';
import { Category } from 'src/app/interfaces/category';
import { ProjectViewComponent } from './project-view/project-view.component';
import { Project } from 'src/app/interfaces/project';
import { Submission } from 'src/app/interfaces/submission';
import { FinalizeComponent, FinalizeData } from './finalize/finalize.component';

@Component({
  selector: 'submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css'],
})
export class SubmissionsComponent implements OnInit {
  isLoading = true;

  judges$: BehaviorSubject<Judge[]>;
  judge: Judge;

  todo: string[] = [];

  rankings: string[] = [];

  isUpdating = false;

  constructor(
    private service: JudgeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getJudge();
  }

  findSubmissionById(id: string) {
    return this.judge.group?.submissions.find(s => s.id === id);
  }

  getJudge() {
    this.isLoading = true;
    this.service.getJudge().subscribe(judge => {
      judge.category = judge.category as Category;
      this.judge = judge;
      this.rankings = judge.rankings || [];
      this.todo.push(...judge.group?.submissions.map(s => s.id).filter(id => !judge.rankings?.includes(id)));
      this.isLoading = false;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.isUpdating = true;
    this.service
      .rankSubmissions(this.rankings)
      .subscribe(j => {
        this.rankings = j.rankings;
        this.isUpdating = false;
      });
  }

  viewProject(project: Project) {
    this.dialog.open(ProjectViewComponent, { width: `50%`, data: project });
  }

  finalizeRankings() {
    const data: FinalizeData = {
      totalSubmissions: (this.todo.length + this.rankings.length),
      rankings: this.rankings.map(id => this.findSubmissionById(id)),
      cb: () => this.getJudge()
    };

    this.dialog.open(FinalizeComponent, { width: `50%`, data });
  }
}
