const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_course");

/**
 *      /create used to create a new course 
 */
router.put("/create", controller_appraisal_modules.courseAPI);

module.exports = router;
