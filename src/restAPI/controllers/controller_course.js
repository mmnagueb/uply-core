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
 * @route   POST /api/v1/course/update
 * @returns {Course}
 * @author  Bassam
 * @access  private 
 * @version 1.0
 */

exports.courseUpdateAPI = async (req, res) => {

  try {
    /**
     *  {
     *    /// [ref] is used for query filter
     *    "ref": { "courseName": "Introduction to Artificial Intelligence2"},
     * 
     *    /// [data] contains the updated course data
     *    "data": {
     *       "courseName": {
     *         "en": "Introduction to Artificial Intelligence",
     *         "ar": "مقدمة في الذكاء الاصطناعي"
     *      },
     *       ...
     *    }
     *  }
     * 
     */
    const filterByCourseName = req.body.ref;
    const newCourseData = req.body.data;
    const updatedCourse = await courseDb.updateCourse(filterByCourseName, newCourseData);
    
    return res.status(200).send(
      Response.successful({
        msg: "Course has been created.",
        data: updatedCourse
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
 * @returns {Course Register}
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

/**
 * @async
 * @route   GET /api/v1/course/get-available-courses
 * @returns {Course Register}
 * @author  Bassam
 * @access  private 
 * @version 1.0
 */

exports.getAvailableCoursesAPI = async (req, res) => {
  try { 
    /// we might consider more filters in the future if needed.
    const availableCourses = await courseDb.getAvailableCourses();
    return res.status(200).send(
      Response.successful({
        data: availableCourses,
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