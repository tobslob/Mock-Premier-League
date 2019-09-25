import mongoose from 'mongoose';
import moment from 'moment';
import TeamModel from '../models/teamModel';
import response from '../utils/response';
import messages from '../utils/messages';

/** *
   * @exports {class} Users
   */
class TeamController {
  /**
     *  admin can add team
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
  static async addTeam(req, res) {
    const {
      teamName, teamMembers, description
    } = req.body;
    try {
      if (!req.user.isAdmin) {
        return response(res, 403, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const teams = new TeamModel({
        _id: new mongoose.Types.ObjectId(),
        teamName,
        teamMembers,
        description
      });
      const team = await teams.save();
      if (team) {
        return response(res, 201, 'success', { team });
      }
    } catch (error) {
      error.errors.teamName.name === 'ValidatorError'
        ? response(res, 409, 'error', {
          message: messages.duplicateName
        })
        : response(res, 400, 'error', {
          message: messages.error
        });
    }
  }

  /**
   *  admin can a remove team
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
  static async removeTeam(req, res) {
    const { teamId } = req.params;
    try {
      if (!req.user.isAdmin) {
        return response(res, 403, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const team = await TeamModel.findByIdAndDelete({ _id: teamId }).exec();
      if (!team) {
        return response(res, 404, 'error', {
          message: messages.notfound
        });
      }
      return response(res, 200, 'error', {
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
   *  admin can edit a team method
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
  static async editTeam(req, res) {
    const { teamName, teamMembers, description } = req.body;
    try {
      const team = await TeamModel.findByIdAndUpdate(
        { _id: req.params.teamId },
        {
          $set: {
            teamName,
            teamMembers,
            description,
            updatedAt: moment(Date.now()).format('LLLL')
          }
        },
        { useFindAndModify: false }
      )
        .exec();
      if (!req.user.isAdmin) {
        return response(res, 403, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      if (!team) {
        return response(res, 404, 'error', {
          message: messages.notfound
        });
      }
      return response(res, 200, 'success', {
        message: messages.updateMessage
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
   *  view a team method
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
  static async viewATeam(req, res) {
    const { teamId } = req.params;
    try {
      const team = await TeamModel.findById({ _id: teamId })
        .select('_id teamName teamMembers description createdAt updatedAt')
        .exec();
      if (!team) {
        return response(res, 404, 'error', {
          message: messages.notfound
        });
      }
      return response(res, 200, 'success', {
        team
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
   *  view all team method
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
  static async viewAllTeam(req, res) {
    try {
      const teams = await TeamModel.find()
        .select('_id teamName teamMembers description createdAt updatedAt')
        .exec();
      return response(res, 200, 'success', {
        teams,
        count: teams.length
      });
    } catch (error) {
      return response(res, 400, 'error', {
        message: messages.error
      });
    }
  }
}

export default TeamController;
