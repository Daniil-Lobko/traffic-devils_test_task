import { Request, Response, NextFunction } from 'express';
import { administratorSchema } from '../models/Administrator';

function validateAdministrator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = administratorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export { validateAdministrator };
