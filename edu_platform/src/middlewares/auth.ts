import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthedRequest extends Request {
  user?: { id: string; role: string };
}

export function auth(requiredRole?: string) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" "); 
    if (!token) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      req.user = { id: payload.id, role: payload.role };

      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ message: 'Доступ запрещён' });
      }

      next();
    } catch (e) {
      return res.status(401).json({ message: 'Неверный токен' });
    }
  };
}
