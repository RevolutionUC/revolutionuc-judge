export type Role = 'SUDO' | 'ADMIN' | 'JUDGE' | 'HACKER';

export interface User {
  id?: string;
  username: string;
  password?: string;
  role: Role;
}

export interface Login {
  token: string
  user: User
}