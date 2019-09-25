import mongoose from 'mongoose';
import moment from 'moment';
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

  /**
       *  admin can remove fixture
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
  static async removeFixture(req, res) {
    const { fixtureId } = req.params;
    try {
      if (!req.user.isAdmin) {
        return response(res, 404, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const fixture = await FixtureModel.findByIdAndDelete({ _id: fixtureId }).exec();
      if (!fixture) {
        return response(res, 404, 'error', {
          message: messages.notfound
        });
      }
      return response(res, 200, 'success', {
        message: messages.deleteMessage
      });
    } catch (error) {
      error.name === 'CastError'
        ? response(res, 400, 'error', {
          message: messages.castError
        })
        : response(res, 400, 'error', {
          message: messages.error
        });
    }
  }

  /**
     *  admin can edit a fixture method
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
  static async editFixture(req, res) {
    try {
      const { body, params } = req;
      const {
        teamA, teamB, matchInfo, status
      } = body;
      if (!req.user.isAdmin) {
        return response(res, 400, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const { fixtureId } = params;
      const fixture = await FixtureModel.findByIdAndUpdate(
        { _id: fixtureId },
        {
          $set: {
            teamA,
            teamB,
            matchInfo,
            status,
            updatedAt: moment(Date.now()).format('LLLL')
          }
        },
        { useFindAndModify: false }
      )
        .exec();
      if (!fixture) {
        return response(res, 404, 'error', {
          message: messages.notfound
        });
      }
      return response(res, 200, 'success', {
        message: messages.updateMessage
      });
    } catch (error) {
      return response(res, 400, 'error', {
        message: messages.error
      });
    }
  }

  /**
       *  admin can view a fixture method
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
  static async viewAFixture(req, res) {
    const { fixtureId } = req.params;
    try {
      if (!req.user.isAdmin) {
        return response(res, 400, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const fixture = await FixtureModel.findById({ _id: fixtureId })
        .exec();
      if (!fixture) {
        return response(res, 404, 'error', {
          message: messages.notfound
        });
      }
      return response(res, 200, 'success', {
        fixture
      });
    } catch (error) {
      error.name === 'CastError'
        ? response(res, 400, 'error', {
          message: messages.castError
        })
        : response(res, 400, 'error', {
          message: messages.error
        });
    }
  }

  /**
           *  Admin can view all fixture method
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
  static async viewAllFixture(req, res) {
    try {
      if (!req.user.isAdmin) {
        return response(res, 400, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const fixture = await FixtureModel.find().exec();
      return response(res, 200, 'success', {
        fixture,
        count: fixture.length
      });
    } catch (error) {
      response(res, 400, 'error', {
        message: messages.error
      });
    }
  }
}

export default FixtureController;
