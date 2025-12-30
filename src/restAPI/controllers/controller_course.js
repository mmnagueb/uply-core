const { Response } = require("../../utils/response");
const userDb = require("./../../database/db_user");
const { createCourse } = require("./../../database/db_course");
/**
 * @async
 * @route   POST /api/v1/user/update
 * @returns {User}
 * @author  Bassam
 * @access  private 
 * @version 1.0
 */

exports.courseAPI = async (req, res) => {
  try {

    const newCourse = await createCourse(req.body.data);
    return res.status(201).send(
      Response.successful({
        msg: "Course has been created.",
        data: newCourse
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