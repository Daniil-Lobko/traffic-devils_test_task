import { Request, Response, NextFunction } from 'express';
import { bookSchema } from '../models/Book';

function validateBook(req: Request, res: Response, next: NextFunction) {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export { validateBook };
