import { Injectable } from '@angular/core';
import json2csv from 'csvjson-json2csv';
import { Group } from 'src/app/interfaces/judge';
import { Submission } from 'src/app/interfaces/submission';
import { Category } from 'src/app/interfaces/category';

@Injectable()
export class AssignmentService {
  private sortGroupsBySubmissionLength(a: Group, b: Group): number {
    return b.submissions.length - a.submissions.length;
  }

  private sortGroupsByName(a: Group, b: Group): number {
    if (a.name > b.name) { return 1; }
    if (a.name < b.name) { return -1; }
    return 0;
  }

  private shuffleArr<T>(subs: T[]): T[] {
    const newSubs = [ ...subs ];

    for (let i = newSubs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newSubs[i], newSubs[j]] = [newSubs[j], newSubs[i]];
    }

    return newSubs;
  }

  private generateCsvFile(csvString: string, filename: string) {
    const csvContent = `data:text/csv;charset=utf-8,${csvString}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement(`a`);
    link.setAttribute(`href`, encodedUri);
    link.setAttribute(`download`, `${filename}.csv`);
    document.body.appendChild(link);

    link.click();
  }

  private getGroupSubmissionTitle(group: Group, i: number) {
    const submission = group.submissions[i];
    if (!submission) {
      return ``;
    }
    const disqualified = !!submission.project.disqualified;
    console.log({ disqualified, submission: submission.project.title });
    if (disqualified) {
      return `(DQ) ${submission.project.title}`;
    }
    return submission.project.title;
  }

  downloadSubmissionCsv(groups: Group[]) {
    groups.sort(this.sortGroupsBySubmissionLength);
    const csvLength = groups[0].submissions.length;

    groups.sort(this.sortGroupsByName);

    groups.forEach(group => {
      group.submissions = this.shuffleArr(group.submissions);
    });

    const json = [];
    const categoryRow = {};
    groups.forEach(group => {
      categoryRow[group.name] = group.category.name;
    });
    json.push(categoryRow);
    for (let i = 0; i < csvLength; i++) {
      const row = {};
      groups.forEach(group => {
        row[group.name] = this.getGroupSubmissionTitle(group, i);
      });
      json.push(row);
    }

    const csvString = json2csv(json);

    this.generateCsvFile(csvString, `submission-assignment`);
  }

  downloadJudgeCsv(groups: Group[]) {
    groups.sort(this.sortGroupsBySubmissionLength);
    const csvLength = groups[0].submissions.length;

    groups.sort(this.sortGroupsByName);

    groups.forEach(group => {
      group.judges = this.shuffleArr(group.judges);
    });

    const json = [];
    const categoryRow = {};
    groups.forEach(group => {
      categoryRow[group.name] = group.category.name;
    });
    json.push(categoryRow);
    for (let i = 0; i < csvLength; i++) {
      const row = {};
      groups.forEach(group => {
        row[group.name] = group.judges[i] ? `${group.judges[i].name} <${group.judges[i].email}>` : ``;
      });
      json.push(row);
    }

    const csvString = json2csv(json);

    this.generateCsvFile(csvString, `judge-assignment`);
  }
}
