const pool = require("../config/database");

class CourseReasonRepository {
  /**
   * Tạo lý do học tập mới cho khóa học
   * @param {number} courseId - ID của khóa học
   * @param {string} content - Nội dung của lý do học tập
   * @param {number} orderIndex - Thứ tự hiển thị của lý do học tập
   * @return {Promise<number>} - ID của lý do học tập mới được tạo
   * */
  async createReason(courseId, content, orderIndex) {
    const query =
      "INSERT INTO course_reasons (courseId, content, orderIndex) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [courseId, content, orderIndex]);
    return result.insertId;
  }

  /**
   * Lấy danh sách lý do học tập của khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Array>} - Danh sách lý do học tập của khóa học
   * */
  async getReasonsByCourseId(courseId) {
    const query = "SELECT * FROM course_reasons WHERE courseId = ?";
    const [rows] = await pool.query(query, [courseId]);
    return rows;
  }

  /**
   * Cập nhật lý do học tập của khóa học
   * @param {number} reasonId - ID của lý do học tập cần cập nhật
   * @param {string} content - Nội dung mới của lý do học tập
   * @param {number} orderIndex - Thứ tự hiển thị mới của lý do học tập
   * @return {Promise<void>}
   * */
  async updateReason(reasonId, content, orderIndex) {
    const query =
      "UPDATE course_reasons SET content = ?, orderIndex = ? WHERE id = ?";
    await pool.query(query, [content, orderIndex, reasonId]);
  }

  /**
   * Xóa lý do học tập của khóa học
   * @param {number} reasonId - ID của lý do học tập cần xóa
   * @return {Promise<void>}
   * */
  async deleteReason(reasonId) {
    const query = "DELETE FROM course_reasons WHERE id = ?";
    await pool.query(query, [reasonId]);
  }
}

module.exports = new CourseReasonRepository();
