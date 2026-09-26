export type UserRole =
  | 'standard'
  | 'locked_out'
  | 'problem'
  | 'performance_glitch'
  | 'error'
  | 'visual';

export interface User {
  readonly username: string;
  readonly password: string;
  readonly role: UserRole;
}
