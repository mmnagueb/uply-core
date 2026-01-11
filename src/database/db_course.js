const Course = require("../model/course/course");
const CourseRegistration = require("../model/course/course.registration");
const logger = require("../../logger").logger;

const createCourse = async (course) => {
  try {
    return await Course.create({
      courseName: {
        en: course.courseName.en,
        ar: course.courseName.ar,
      },
      courseDesc: {
        en: course.courseDesc.en,
        ar: course.courseDesc.ar,
      },
      courseStatus: {
        en: course.courseStatus.en,
        ar: course.courseStatus.ar,
      },
      courseDomain: {
        en: course.courseDomain.en,
        ar: course.courseDomain.ar,
      },
      courseMethod: {
        en: course.courseMethod.en,
        ar: course.courseMethod.ar,
      },
      courseType: {
        en: course.courseType.en,
        ar: course.courseType.ar,
      },
      courseLocation: {
        en: course.courseLocation.en,
        ar: course.courseLocation.ar,
      },
      coursePrice: course.coursePrice,
      courseDiscount: course.courseDiscount,
      coursePeriod: course.coursePeriod,
      courseLength: course.courseLength,
      courseImage: course.courseImage,
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getCourseByCourseName = async (courseName) => {
  try {
    const result = await Course.findOne({ 'courseName.en': courseName });
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getCourseById = async (courseId) => {
  try {
    const result = await Course.findById(courseId);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const updateCourse = async (courseId, course) => {
  try {
    const filter = { _id: courseId };
    const update = course;
    const options = { new: true, runValidators: true };
    const result = await Course.findOneAndUpdate(
      filter,
      { $set: update },
      options
    );
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getCourseIdByCourseName = async (courseName) => {
  try {
    const result = await Course.findOne({ 'courseName.en': courseName });
    return result._id;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getAvailableCourses = async () => {
  try {
    return await Course.find({});
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getRegisteredCourses = async (userId) => {
  try {
    const filter = { 'userId': userId}
    return await CourseRegistration.find(filter)
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const createCourseRegistrationTransaction = async (courseRegister) => {
  try {
    const isExist = await CourseRegistration.exists({
      courseId: courseRegister.courseId,
      userId: courseRegister.userId,
    });

    if (isExist) throw "User is already registered.";

    return await CourseRegistration.create({
      courseId: courseRegister.courseId,
      userId: courseRegister.userId,
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  createCourse,
  getCourseById,
  getCourseByCourseName,
  updateCourse,
  getCourseIdByCourseName,
  getAvailableCourses,
  getRegisteredCourses,
  createCourseRegistrationTransaction
};
