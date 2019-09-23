import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/userModel';
import messages from '../utils/messages';
import response from '../utils/response';

dotenv.config();


/**
 *  Authenticate users
 */
class Authentication {
  /**
   * Generate token based on payload.
   *
   * @param {*} _id
   * @param {*} email
   * @param {*} isAdmin
   * @returns {String} token
   */
  static generateToken(_id, email, isAdmin) {
    const token = jwt.sign(
      {
        _id,
        email,
        isAdmin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
      },
    );

    return token;
  }

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {String} token
   */
  static async verifyToken(req, res, next) {
    try {
      if (!req.headers.authorization) return response(res, 401, 'error', { message: messages.unAuthorized });

      const token = req.headers.authorization.split(' ')[1];

      const decoded = await jwt.verify(token, process.env.SECRET_KEY);

      const user = await UserModel.findOne({ _id: decoded._id });

      if (!user) return response(res, 401, 'error', { message: messages.tokenError });

      // get user payload
      req.user = decoded;

      return next();
    } catch (errors) {
      if (errors.name === 'TokenExpiredError') return response(res, 400, 'error', { message: messages.tokenExpired });
      return response(res, 400, 'error', { message: messages.error });
    }
  }
}

export default Authentication;
