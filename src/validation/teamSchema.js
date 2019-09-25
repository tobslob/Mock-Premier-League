import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';

const name = JoiValidator.validateString().valid(
  'AFC Bournemouth', 'Arsenal', 'Aston Villa', 'Brighton & Hove Albion', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United',
  'Newcastle United', ' Norwich City', 'Sheffield United', 'Southampton', 'Tottenham Hotspur', 'Watford', 'West Ham United', 'Wolverhampton Wanderers'
).required();

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

export { addTeamSchema, name };
