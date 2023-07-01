import Joi from 'joi';

interface Manager {
  name: string;
  password: string;
}

const managerSchema = Joi.object<Manager>({
  name: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export { Manager, managerSchema };
