/**
 * Sri Valli Glass Traders - Authentication & Authorization Engine
 * Session & JWT Verification with Role-Based Access Control (RBAC)
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'srivalli-glass-traders-secure-jwt-key-2026-production';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'OPERATOR' | 'SALES_EXECUTIVE';
}

const DEFAULT_USERS: Array<AuthUser & { passwordHash: string }> = [
  {
    id: 'usr-owner',
    name: 'Srivalli Kumar (Proprietor)',
    email: 'owner@srivalliglass.com',
    role: 'OWNER',
    passwordHash: 'admin123', // In production, bcrypt hash
  },
  {
    id: 'usr-operator',
    name: 'Ramesh Reddy (Cutter & Incharge)',
    email: 'operator@srivalliglass.com',
    role: 'OPERATOR',
    passwordHash: 'operator123',
  },
];

export function authenticateCredentials(email: string, pass: string): AuthUser | null {
  const normalizedEmail = email.toLowerCase().trim();
  const user = DEFAULT_USERS.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) return null;

  if (user.passwordHash === pass) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  return null;
}

export function signToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (e) {
    return null;
  }
}
