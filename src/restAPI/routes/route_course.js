const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_course");

/**
 *      /create used to create a new course 
 */
router.put("/create", controller_appraisal_modules.courseCreateAPI);

/**
 *      /update used to update a specific course 
 */
router.post("/update", controller_appraisal_modules.courseUpdateAPI);

/**
 *      /create used to create a new course 
 */
router.post("/register", controller_appraisal_modules.courseRegisterAPI);

module.exports = router;
