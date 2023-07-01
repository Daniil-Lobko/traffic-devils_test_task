import Joi from 'joi';

interface Administrator {
  name: string;
  password: string;
}

const administratorSchema = Joi.object<Administrator>({
  name: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export { Administrator, administratorSchema };
