import { Submission } from './submission';

export interface Project {
  id: string;
  title: string;
  url: string;
  tagline: string;
  description: string;
  submitterEmail: string;
  submitterName: string;
  disqualified?: string;
  submissions: Submission[];
  categories?: string;
}
