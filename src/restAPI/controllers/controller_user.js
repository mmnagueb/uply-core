const { Response } = require("../../utils/response");
const userDb = require("./../../database/db_user");

/**
 * @async
 * @route   POST /api/v1/user/update
 * @returns {User}
 * @author  Bassam
 * @access  private 
 * @version 1.0
 */

exports.updateAPI = async (req, res) => {
  try {
    // const username = req.user.username;
    const userId = req.userMongoId;
    const user = req.body.data;

    await userDb.updateUser(user, userId);
    return res.status(200).send(
      Response.successful({
        msg: "Profile has been updated.",
      })
    );
  } catch (error) {
   return res.status(400).send(
      Response.badRequest({
        msg: error.toString(),
      })
    ); 
  }
};


/**
 * @async
 * @route   POST /api/v1/user/profile
 * @returns {User}
 * @author  Bassam
 * @access  private
 * @version 1.0
 */

exports.profileAPI = async (req, res) => {
  /// update profile will be based on the authenticated user
  try {
    const userId = req.userMongoId
    // const profile = await userDb.getUserByUsername(username);
    /// TODO update actual profile

    const profile = await userDb.getUserProfileById(userId)

    return res.status(200).send(
      Response.successful({
        data: profile,
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

