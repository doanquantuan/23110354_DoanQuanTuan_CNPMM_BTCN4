const express = require("express");
const courseController = require("../controllers/courseController");
const sectionController = require("../controllers/sectionController");

const router = express.Router();

router.get("/:id", courseController.getCourseDetail);

router.get("/:id/sections", sectionController.getSectionsByCourseId);

module.exports = router;
