import { Request, Response, NextFunction } from 'express';
import { getUserBookSchema } from '../models/getUserBook';

function validateGetUserBook(req: Request, res: Response, next: NextFunction) {
  const { error } = getUserBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export { validateGetUserBook };
