import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const secretKey = process.env.SECRET_KEY || 'FDFGlskdfmnerwLKJGFHDEFGLKJ';

// Функция для генерации токена
function generateToken(payload: any): string {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Измените время истечения токена по вашим потребностям
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('SELECT * FROM insert_user($1,$2, $3)', [
      name,
      hashedPassword,
      3,
    ]);
    const token = generateToken({ name });
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log('token-error');
      } else {
        console.log('token-successfull');
      }
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, password } = req.body;
    const user = await pool.query(
      'SELECT * FROM book_collection.user WHERE name = $1',
      [name],
    );

    if (user.rows.length > 0) {
      const storedPassword = user.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, storedPassword);
      if (passwordMatch) {
        const token = generateToken({ name });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ message: 'User-not-found' });
    }
  } catch (error) {
    next(error);
  }
}

export { register, login };
