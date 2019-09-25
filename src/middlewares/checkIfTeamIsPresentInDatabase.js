import TeamModel from '../models/teamModel';
import messages from '../utils/messages';
import response from '../utils/response';

/**
   * Middleware to check if teams are
   * present in the database
   * @param {object} req - response object
   * @param {object} res - response object
   * @param {object} next - response object
   * @param {number} status - http status code
   * @param {string} statusMessage - http status message
   * @param {object} data - response data
   *
   * @returns {object} returns response
   *
   * @example
   *
   */
const checkIfTeamIsPresentInDatabase = async (req, res, next) => {
  const teamA = req.body.teamA[0].name;
  const teamB = req.body.teamB[0].name;

  try {
    const team1 = await TeamModel.find({ teamName: teamA }).exec();
    const team2 = await TeamModel.find({ teamName: teamB }).exec();
    if (team1.length <= 0 || team2.length <= 0) {
      return response(res, 404, 'error', {
        message: messages.teamNotFound
      });
    }
    return next();
  } catch (error) {
    return response(res, 400, 'error', {
      message: messages.error
    });
  }
};

export default checkIfTeamIsPresentInDatabase;
