const courseTargetService = require("../services/courseTargetService");

const createCourseTarget = async (req, res, next) => {
  try {
    const { courseId, content, orderIndex } = req.body;
    const result = await courseTargetService.createCourseTarget(
      courseId,
      content,
      orderIndex,
    );
    return res.status(201).json({
      success: true,
      message: "Tạo mục tiêu khóa học thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseTargets = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const result = await courseTargetService.getCourseTargets(courseId);
    return res.status(200).json({
      success: true,
      message: "Lấy danh sách mục tiêu khóa học thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourseTarget = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const { content, orderIndex } = req.body;
    await courseTargetService.updateCourseTarget(targetId, content, orderIndex);
    return res.status(200).json({
      success: true,
      message: "Cập nhật mục tiêu khóa học thành công",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourseTarget = async (req, res, next) => {
  try {
    const { targetId } = req.params;

    await courseTargetService.deleteCourseTarget(targetId);
    return res.status(200).json({
      success: true,
      message: "Xóa mục tiêu khóa học thành công",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourseTarget,
  getCourseTargets,
  updateCourseTarget,
  deleteCourseTarget,
};
