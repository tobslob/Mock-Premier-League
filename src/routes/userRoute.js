import express from 'express';
import validate from '../middlewares/validator';
import UserController from '../controllers/UserController';
import Authentication from '../middlewares/Authentication';
import user from '../validation/userSchema';

const { signInSchema, signUpSchema } = user;


const router = express.Router();

// create user route
router.post('/signup', validate(signUpSchema), UserController.createUser);

// delete user route
router.delete('/:userId', Authentication.verifyToken, UserController.deleteUser);

// log in user in route
router.post('/login', validate(signInSchema), UserController.loginUser);

// Get a user in route
router.get('/:userId', Authentication.verifyToken, UserController.getAUser);


export default router;
