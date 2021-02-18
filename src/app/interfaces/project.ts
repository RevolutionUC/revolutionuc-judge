import { Submission } from './submission';

export interface Project {
  id: string;
  title: string;
  url: string;
  submitter: string;
  categories?: string;
  disqualified?: string;
  team: string[];
  submissions: Submission[];
}
