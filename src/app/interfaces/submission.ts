import { Category } from './category';
import { Project } from './project';

export interface Submission {
  id: string;
  project: Project;
  category: Category;
}
