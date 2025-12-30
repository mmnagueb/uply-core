const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_utils");

/**
 *      /cities to current supported cities 
 */
router.get("/cities", controller_appraisal_modules.saudiCitiesAPI);

module.exports = router;
