import Joi from 'joi';

interface User {
  name: string;
  password: string;
}

const userSchema = Joi.object<User>({
  name: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export { User, userSchema };
