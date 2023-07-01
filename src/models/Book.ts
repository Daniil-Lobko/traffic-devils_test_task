import Joi from 'joi';

interface Book {
  title: string;
  author: string;
  description: string;
  name: string;
}

const bookSchema = Joi.object<Book>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  name: Joi.string().required(),
});

export { Book, bookSchema };
