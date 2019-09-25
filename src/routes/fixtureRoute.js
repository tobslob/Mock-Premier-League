import express from 'express';
import validate from '../middlewares/validator';
import FixtureController from '../controllers/FixtureController';
import Authentication from '../middlewares/Authentication';
import addFixtureSchema from '../validation/fixtureSchema';
import checkIfTeamIsPresentInDatabase from '../middlewares/checkIfTeamIsPresentInDatabase';

const router = express.Router();

// create a fixture route
router.post('/fixture', Authentication.verifyToken, validate(addFixtureSchema), checkIfTeamIsPresentInDatabase, FixtureController.addFixture);

export default router;
