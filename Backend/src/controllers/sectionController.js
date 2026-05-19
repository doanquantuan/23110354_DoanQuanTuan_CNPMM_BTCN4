const SectionService = require("../services/sectionService");
class SectionController {
  async getSectionsByCourseId(req, res, next) {
    try {
      const { id } = req.params;
      const sections = await SectionService.getSectionsByCourseId(id);
      return res.status(200).json({
        success: true,
        message: "Lấy chương theo khóa học thành công",
        data: sections,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SectionController();
