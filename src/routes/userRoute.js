import express from 'express';
import validate from '../middlewares/validator';
import UserController from '../controllers/UserController';
// import Authentication from '../middlewares/Authentication';
import signUpSchema from '../validation/userSchema';


const router = express.Router();

// create user route
router.post('/signup', validate(signUpSchema), UserController.createUser);

// // delete user route
// router.delete('/user/:userId', Authentication.verifyToken, Users.deleteUser);

// // log in user in route
// router.post('/user/login', validate(signInSchema), Users.loginUser);

// // Get all user in route
// router.get('/users', Authentication.verifyToken, Users.getAllUser);


export default router;
