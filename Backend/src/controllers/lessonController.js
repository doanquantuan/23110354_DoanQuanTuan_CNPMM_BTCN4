const LessonService = require("../services/lessonService");

class LessonController {
  async getLessonsBySectionId(req, res, next) {
    try {
      const { id } = req.params;
      const lessons = await LessonService.getLessonsBySectionId(id);
      return res.status(200).json({
        success: true,
        message: "Lấy bài học theo chương thành công",
        data: lessons,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LessonController();
