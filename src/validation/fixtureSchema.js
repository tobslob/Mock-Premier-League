import Joi from '@hapi/joi';
import JoiValidator from './JoiValidator';
import { name } from './teamSchema';

const validTeam = JoiValidator.validateArray().items({
  name,
  score: JoiValidator.validateNumber().min(0).required()
}).required();

const addFixtureSchema = Joi.object({
  teamA: validTeam,
  teamB: validTeam.unique(),
  status: JoiValidator.validateString().valid('completed', 'ongoing').default('pending'),
  matchInfo: JoiValidator.validateArray()
    .items({
      date: JoiValidator.validateDate().min(Date.now()),
      stadium: JoiValidator.validateString().valid(
        'Vitality Stadium', 'The Amex', 'Turf Moor', 'Cardiff City Stadium', "John Smith's Stadium", 'King Power Stadium', 'Goodison Park', 'Anfield', 'Emirates Stadium', 'Stamford Bridge', 'Selhurst Park', 'Craven Cottage',
        'Wembley Stadium', 'London Stadium', 'Etihad Stadium', 'Old Trafford', 'St James Park', "St Mary's Stadium", 'Vicarage Road', 'Molineux Stadium'
      )
    }).required()
});

export default addFixtureSchema;
