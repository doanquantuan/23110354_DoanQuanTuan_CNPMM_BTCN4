const express = require("express");
const sectionController = require("../controllers/sectionController");
const lessonController = require("../controllers/LessonController");

const router = express.Router();

router.get("/:id/lessons", lessonController.getLessonsBySectionId);

module.exports = router;
