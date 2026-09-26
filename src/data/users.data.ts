import { User, UserRole } from '../types';

export const USERS: Record<UserRole, User> = {
  standard: { username: 'standard_user', password: 'secret_sauce', role: 'standard' },
  locked_out: { username: 'locked_out_user', password: 'secret_sauce', role: 'locked_out' },
  problem: { username: 'problem_user', password: 'secret_sauce', role: 'problem' },
  performance_glitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    role: 'performance_glitch',
  },
  error: { username: 'error_user', password: 'secret_sauce', role: 'error' },
  visual: { username: 'visual_user', password: 'secret_sauce', role: 'visual' },
} as const;

export const INVALID_USER = {
  username: 'invalid_user',
  password: 'wrong_password',
} as const;
