import { Request, Response, NextFunction } from 'express';
import { managerSchema } from '../models/Manager';

function validateManager(req: Request, res: Response, next: NextFunction) {
  const { error } = managerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export { validateManager };
