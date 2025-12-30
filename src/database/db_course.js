const Course = require("../model/course/course");
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

module.exports = {
  createCourse,
};
