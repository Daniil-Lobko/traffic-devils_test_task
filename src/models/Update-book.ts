import Joi from 'joi';

interface updateBook {
  title: string;
  description: string;
}

const updateBookSchema = Joi.object<updateBook>({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export { updateBook, updateBookSchema };
