export interface User {
  id?: string;
  username: string;
  password?: string;
  role: 'SUDO' | 'ADMIN' | 'JUDGE' | 'HACKER';
}

export interface Login {
  token: string
  user: User
}