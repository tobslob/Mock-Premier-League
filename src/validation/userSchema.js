import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const validEmail = JoiValidator.validateEmail().required();
const validPassword = JoiValidator.validatePassword().required();

const signUpSchema = Joi.object({
  email: validEmail,
  password: validPassword,
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
});

const signInSchema = Joi.object({
  email: validEmail,
  password: validPassword,
});

export default { signUpSchema, signInSchema };
