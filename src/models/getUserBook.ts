import Joi from 'joi';

interface getUserBook {
  userId: number;
}

const getUserBookSchema = Joi.object<getUserBook>({
  userId: Joi.number().required().min(1),
});

export { getUserBook, getUserBookSchema };
