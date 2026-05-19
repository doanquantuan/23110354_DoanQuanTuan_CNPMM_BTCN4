const LessonRepository = require("../repositories/lessonRepository");

class LessonService {
  async getLessonsBySectionId(sectionId) {
    if (!sectionId) {
      throw new Error("Section id is required");
    }

    const lessons = await LessonRepository.getLessonsBySectionId(sectionId);
    return lessons;
  }
}

module.exports = new LessonService();
