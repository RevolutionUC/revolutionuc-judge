import { Category } from './category';
import { Submission } from './submission';

export interface Judge {
  id?: string;
  name: string;
  email: string;
  category: string | Category;
  group?: Group;
  rankings?: Array<string>;
  isFinal?: boolean;
}

export interface Group {
  id: string;
  name: string;
  category: Category;
  judges: Judge[];
  submissions: Submission[];
}

// export interface Login {
//   token: string
//   user: User
// }
