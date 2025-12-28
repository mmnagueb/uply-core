const { Response } = require("../../common/response");
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
    const username = req.user.username;
    const user = req.body.data;

    await userDb.updateUser(user, username);

    return res.status(200).send(
      Response.successful({
        msg: "Profile has been updated.",
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
    const username = req.user.username;
    const profile = await userDb.getUserByUsername(username);

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

