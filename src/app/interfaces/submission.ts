import { Category } from './category';
import { Project } from './project';

export interface Submission {
  id: string;
  score: number;
  project: Project;
  category: Category;
}
