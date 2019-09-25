import mongoose from 'mongoose';
import FixtureModel from '../models/fixtureModel';
import response from '../utils/response';
import messages from '../utils/messages';
import compareTwoArrays from '../helper.js/compareTwoArrays';

/** *
 * @exports {class} FixtureController
 */
class FixtureController {
  /**
   *  admin can add fixture
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
  static async addFixture(req, res) {
    const { teamA, teamB, matchInfo } = req.body;
    try {
      if (!req.user.isAdmin) {
        return response(res, 404, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const fixture = new FixtureModel({
        _id: new mongoose.Types.ObjectId(),
        teamA,
        teamB,
        matchInfo
      });

      const compare = await compareTwoArrays(teamA, teamB);
      if (compare) {
        return response(res, 409, 'error', {
          message: messages.sameTeam
        });
      }
      const result = await FixtureModel.find({ teamA, teamB, matchInfo });
      if (result.length >= 1) {
        return response(res, 409, 'error', {
          message: messages.existingFixture
        });
      }
      const createfixture = await fixture.save();
      if (createfixture) {
        return response(res, 201, 'success', {
          createfixture
        });
      }
    } catch (error) {
      return response(res, 400, 'error', {
        message: messages.error
      });
    }
  }
}

export default FixtureController;
