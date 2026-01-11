const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_course");

/**
 *      /create used to create a new course
 */
router.put("/create", controller_appraisal_modules.courseCreateAPI);

/**
 *      /create used to create a new course
 */
router.post("/register", controller_appraisal_modules.courseRegisterAPI);

/**
 *      /get-available-courses used to fetch all available courses
 */
router.get(
  "/get-available-courses",
  controller_appraisal_modules.getAvailableCoursesAPI
);

/**
 *      /get-available-courses used to fetch all available courses
 */
router.get(
  "/get-registered-courses",
  controller_appraisal_modules.getRegisteredCoursesAPI
);

/**
 *      /read used to fetch a specific course
 */
router.get("/:id", controller_appraisal_modules.courseReadAPI);

/**
 *      /update used to update a specific course
 */
router.put("/update/:id", controller_appraisal_modules.courseUpdateAPI);

module.exports = router;
