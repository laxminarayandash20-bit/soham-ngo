import { cookies } from 'next/headers';
import { AdminRole, AdminUser } from './types';
import { findAdminByEmail } from './db';

const COOKIE_NAME = 'soham_admin_session';

export interface SessionData {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
}

export function createSessionToken(user: { id: string; email: string; full_name: string; role: AdminRole }): string {
  const payload = JSON.stringify({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    issuedAt: Date.now()
  });
  // Simple Base64 token for session (production can use jose / jsonwebtoken)
  return Buffer.from(payload).toString('base64');
}

export function parseSessionToken(token: string): SessionData | null {
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(raw);
    if (data && data.email && data.role) {
      return {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return parseSessionToken(token);
}

export function isSuperAdmin(role?: string): boolean {
  return role === 'super_admin';
}

export { COOKIE_NAME };
