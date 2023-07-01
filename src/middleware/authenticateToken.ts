import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'FDFGlskdfmnerwLKJGFHDEFGLKJ';

interface AuthenticatedRequest extends Request {
  user?: { [key: string]: any };
}

function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { [key: string]: any };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'token-forbidden' });
  }
}

export default authenticateToken;
