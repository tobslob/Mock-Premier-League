import express from 'express';
import validate from '../middlewares/validator';
import TeamController from '../controllers/TeamController';
import Authentication from '../middlewares/Authentication';
import addTeamSchema from '../validation/teamSchema';

const router = express.Router();

// create a team route
router.post('/team', Authentication.verifyToken, validate(addTeamSchema), TeamController.addTeam);

// remove a team route
router.delete('/team/:teamId', Authentication.verifyToken, TeamController.removeTeam);

export default router;
