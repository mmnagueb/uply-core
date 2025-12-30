const { Response } = require("../../utils/response");
const utils = require("../../utils/index");
/**
 * @async
 * @route   POST /api/v1/user/profile
 * @returns {User}
 * @author  Bassam
 * @access  private
 * @version 1.0
 */

exports.saudiCitiesAPI = async (req, res) => {
  /// update profile will be based on the authenticated user
  try {
    
    return res.status(200).send(
      Response.successful({
        data: utils.saudiCities,
      })
    );
  } catch (error) {
   return res.status(520).send(
      Response.unknown({
        msg: error.toString(),
      })
    ); 
  }
};

