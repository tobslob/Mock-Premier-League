import mongoose from 'mongoose';
import UserModel from '../models/userModel';
import Helper from '../helper.js/helperFunction';
import response from '../utils/response';
import messages from '../utils/messages';
import Authentication from '../middlewares/Authentication';

/** *
   * @exports {class} Users
   */
class UserController {
  /**
     *  Create user method
     * @param {object} req - response object
     * @param {object} res - response object
     * @param {number} status - http status code
     * @param {string} statusMessage - http status message
     * @param {object} data - response data
     *
     * @returns {object} returns response
     *
     * @example
     *
     */
  static async createUser(req, res) {
    try {
      const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: Helper.hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });

      const token = Authentication.generateToken(user.id, user.email, user.isAdmin);

      const doc = await user.save();
      if (doc) {
        return response(res, 201, 'success', {
          message: messages.user,
          data: {
            token
          }
        });
      }
    } catch (error) {
      error.errors.email.name === 'ValidatorError'
        ? response(res, 409, 'error', { message: messages.duplicate })
        : response(res, 400, 'error', { message: messages.error });
    }
  }
}

export default UserController;
