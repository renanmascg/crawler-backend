import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../error/appError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  groupId: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const authHeader = request.headers.authorization;

  try {
    if (!authHeader) {
      throw new AppError('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub, groupId } = decoded as TokenPayload;

    request.user = { id: sub, grupoId: groupId };

    return next();
  } catch {
    return response.status(401).json({ error: 'Invalid JWT Token' });
  }
}
