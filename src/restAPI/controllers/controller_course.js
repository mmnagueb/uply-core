const { Response } = require("../../utils/response");
const courseDb = require("./../../database/db_course");

/**
 * @async
 * @route   PUT /api/v1/course/create
 * @returns {Course}
 * @author  Bassam
 * @access  private 
 * @version 1.0
 */

exports.courseCreateAPI = async (req, res) => {
  try {
    const newCourse = await courseDb.createCourse(req.body.data);
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


/**
 * @async
 * @route   POST /api/v1/course/register
 * @returns {courseRegister}
 * @author  Bassam
 * @access  private 
 * @version 1.0
 */

exports.courseRegisterAPI = async (req, res) => {
  try {
    const userId = req.userMongoId;
    
    const reqBody = req.body.data;
    const courseId = await courseDb.getCourseIdByCourseName(reqBody.courseName);

    const courseRegister = {'courseId': courseId, 'userId': userId};
    const transaction = await courseDb.createCourseRegistrationTransaction(courseRegister)
    
    return res.status(201).send(
      Response.successful({
        msg: "Course has been created.",
        data: transaction
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