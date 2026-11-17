import { describe, it, expect } from 'vitest';
import { generateToken, verifyToken } from '../src/services/authService';

describe('authService', () => {
  it('generates valid JWT token', () => {
    const token = generateToken('user123', 'ADMIN');
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  it('verifies valid token', () => {
    const token = generateToken('user123', 'ADMIN');
    const payload = verifyToken(token);
    expect(payload).toBeTruthy();
    expect(payload.userId).toBe('user123');
    expect(payload.role).toBe('ADMIN');
  });

  it('rejects invalid token', () => {
    const payload = verifyToken('invalid-token');
    expect(payload).toBeNull();
  });
});
