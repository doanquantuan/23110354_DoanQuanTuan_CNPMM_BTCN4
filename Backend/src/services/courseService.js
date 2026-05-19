const courseRepository = require("../repositories/CourseRepository");
const courseObjectiveRepository = require("../repositories/CourseObjectiveRepository");
const courseOutcomeRepository = require("../repositories/CourseOutcomeRepository");
const courseTargetRepository = require("../repositories/CourseTargetRepository");
const courseReasonRepository = require("../repositories/CourseReasonRepository");

class CourseService {
  async getCourseDetail(courseId) {
    if (!courseId) {
      throw new Error("Course id is required");
    }

    const course = await courseRepository.getCourseById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    const [objectives, outcomes, targets, reasons] = await Promise.all([
      courseObjectiveRepository.getObjectivesByCourseId(courseId),

      courseOutcomeRepository.getOutcomesByCourseId(courseId),

      courseTargetRepository.getTargetsByCourseId(courseId),

      courseReasonRepository.getReasonsByCourseId(courseId),
    ]);

    return {
      ...course,

      objectives,
      outcomes,
      targets,
      reasons,
    };
  }
}

module.exports = new CourseService();
