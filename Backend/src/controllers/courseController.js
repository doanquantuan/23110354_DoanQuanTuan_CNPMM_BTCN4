const courseService = require("../services/courseService");

const getCourseDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await courseService.getCourseDetail(id);
    return res.status(200).json({
      success: true,
      message: "Lấy chi tiết khóa học thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourseDetail,
};
