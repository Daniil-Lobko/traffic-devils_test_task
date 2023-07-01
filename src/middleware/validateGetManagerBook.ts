import { Request, Response, NextFunction } from 'express';
import { getManagerBookSchema } from '../models/getManagerBook';

function validateGetManagerBook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = getManagerBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export { validateGetManagerBook };
