import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../models/User';

function validateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export { validateUser };
