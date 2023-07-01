import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';

async function addBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, name } = req.body;

    const user = (
      await pool.query(
        'SELECT * FROM book_collection."user" where book_collection."user".name = $1 ',
        [name],
      )
    ).rows[0];

    const addBook = await pool.query('CALL addUserBookByUserName($1, $2, $3)', [
      title,
      description,
      name,
    ]);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const query = 'SELECT * FROM delete_book($1);';
    const values = [id];

    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const query =
      'UPDATE book_collection.books SET title = $1, description = $2 WHERE id = $3';
    const values = [title, description, id];

    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const query = 'SELECT * FROM book_collection.books';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getManagerBooks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { managerId } = req.body;
  try {
    // @ts-ignore
    const books = [];
    const users = await pool.query(
      'SELECT * FROM book_collection."user" WHERE manager_id = $1;',
      [managerId],
    );

    for (const user of users.rows) {
      const userBooks = await pool.query(
        'SELECT * FROM book_collection.books WHERE id IN (SELECT book_id FROM book_collection.user_books WHERE user_id = $1);',
        [user.id],
      );
      for (const userBook of userBooks.rows) {
        console.log(userBook);
        // @ts-ignore
        if (!books.some((book) => book.title === userBook.title)) {
          books.push(userBook);
        }
      }
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
}

async function getUserBooks(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.body;
  try {
    const query = await pool.query(
      'SELECT * FROM book_collection.books WHERE id IN (SELECT book_id FROM book_collection.user_books WHERE user_id = $1);',
      [userId],
    );
    res.json(query.rows);
  } catch (error) {
    next(error);
  }
}

export {
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getManagerBooks,
  getUserBooks,
};
