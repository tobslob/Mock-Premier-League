import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';
import name from './validateTeamName';

const addTeamSchema = Joi.object({
  teamName: name,
  teamMembers: JoiValidator.validateArray()
    .items({
      name: JoiValidator.validateString(),
      role: JoiValidator.validateString()
        .valid('Goal Keeper', 'Central Back', 'Central Midfield', 'Central Forward', 'Left Wing', 'Attacking Midfield', 'Central Forward', 'Left Midfielder', 'Striker', 'Defending', 'Right Midfielder')
    }).required(),
  description: JoiValidator.validateString()
});

export default addTeamSchema;
