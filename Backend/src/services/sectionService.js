const SectionRepository = require("../repositories/sectionRepository");

class SectionService {
  async getSectionsByCourseId(courseId) {
    if (!courseId) {
      throw new Error("Course id is required");
    }

    const sections = await SectionRepository.getSectionsByCourseId(courseId);

    return sections;
  }
}

module.exports = new SectionService();
