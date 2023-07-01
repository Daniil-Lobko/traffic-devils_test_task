import Joi from 'joi';

interface getManagerBook {
  managerId: number;
}

const getManagerBookSchema = Joi.object<getManagerBook>({
  managerId: Joi.number().required().min(1),
});

export { getManagerBook, getManagerBookSchema };
