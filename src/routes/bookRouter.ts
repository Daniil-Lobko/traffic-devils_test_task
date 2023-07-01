import express from 'express';
import {
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getUserBooks,
  getManagerBooks,
} from '../controllers/bookController';
import { validateBook } from '../middleware/validateBook';
import { validateGetUserBook } from '../middleware/validateGetUserBook';
import { validateGetManagerBook } from '../middleware/validateGetManagerBook';

const bookRouter = express.Router();

bookRouter.post('/', validateBook, addBook); // Добавить книгу
bookRouter.delete('/:id', deleteBook); // Удалить книгу
bookRouter.put('/:id', updateBook); // Изменить книгу
bookRouter.get('/', getAllBooks); // Получить список всех книг Получить список всех список в базе данных
bookRouter.post('/user', validateGetUserBook, getUserBooks); // Получить список всех книг Юзера
bookRouter.post('/manager', validateGetManagerBook, getManagerBooks); // Получить список всех книг Менеджера(подконтрольных юзеров)

export default bookRouter;
