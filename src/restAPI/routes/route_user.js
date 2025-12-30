const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_user");

/**
 *      /update used to update an existing user 
 */
router.post("/update", controller_appraisal_modules.updateAPI);

/**
 *      /profile to get user profile 
 */
router.get("/profile", controller_appraisal_modules.profileAPI);

module.exports = router;
