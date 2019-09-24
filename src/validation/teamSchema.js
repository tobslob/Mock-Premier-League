import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const addTeamSchema = Joi.object({
  teamName: JoiValidator.validateString().required(),
  teamMembers: JoiValidator.validateArray()
    .items({
      name: JoiValidator.validateString(),
      role: JoiValidator.validateString()
        .valid('goal keeper', 'central back', 'central midfield', 'central forward', 'left wing', 'attacking midfield', 'central forward', 'left midfielder', 'striker', 'defending', 'right midfielder')
    }).required(),
  description: JoiValidator.validateString()
});

export default addTeamSchema;
