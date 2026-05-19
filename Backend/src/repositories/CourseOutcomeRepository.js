const pool = require("../config/database");

class CourseOutcomeRepository {
  /**
   * Tạo kết quả học tập mới cho khóa học
   * @param {number} courseId - ID của khóa học
   * @param {string} content - Nội dung của kết quả học tập
   * @param {number} orderIndex - Thứ tự hiển thị của kết quả học tập
   * @return {Promise<number>} - ID của kết quả học tập mới được tạo
   * */
  async createOutcome(courseId, content, orderIndex) {
    const query =
      "INSERT INTO course_outcomes (courseId, content, orderIndex) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [courseId, content, orderIndex]);
    return result.insertId;
  }

  /**
   * Lấy danh sách kết quả học tập của khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Array>} - Danh sách kết quả học tập của khóa học
   * */
  async getOutcomesByCourseId(courseId) {
    const query = "SELECT * FROM course_outcomes WHERE courseId = ?";
    const [rows] = await pool.query(query, [courseId]);
    return rows;
  }

  /**
   * Cập nhật kết quả học tập của khóa học
   * @param {number} outcomeId - ID của kết quả học tập cần cập nhật
   * @param {string} content - Nội dung mới của kết quả học tập
   * @param {number} orderIndex - Thứ tự hiển thị mới của kết quả học tập
   * @return {Promise<void>}
   * */
  async updateOutcome(outcomeId, content, orderIndex) {
    const query =
      "UPDATE course_outcomes SET content = ?, orderIndex = ? WHERE id = ?";
    await pool.query(query, [content, orderIndex, outcomeId]);
  }

  /**
   * Xóa kết quả học tập của khóa học
   * @param {number} outcomeId - ID của kết quả học tập cần xóa
   * @return {Promise<void>}
   * */
  async deleteOutcome(outcomeId) {
    const query = "DELETE FROM course_outcomes WHERE id = ?";
    await pool.query(query, [outcomeId]);
  }
}

module.exports = new CourseOutcomeRepository();
