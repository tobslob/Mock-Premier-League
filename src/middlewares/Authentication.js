import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import messages from '../utils/messages';
import response from '../utils/response';


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
      const token = req.headers.authorization.split(' ')[1];

      // check if token is provided
      if (!token) return response(res, 403, 'error', { message: messages.unAuthorized });

      // verify user provided token against existing token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);

      // eslint-disable-next-line no-underscore-dangle
      const user = await UserModel.findOne({ _id: decoded._id });
      // check for valid app users
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
