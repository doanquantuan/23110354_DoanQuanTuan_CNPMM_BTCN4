const pool = require("../config/database");

class CourseTargetRepository {
  /**
   * Tạo đối tượng học tập mới cho khóa học
   * @param {number} courseId - ID của khóa học
   * @param {string} content - Nội dung của đối tượng học tập
   * @param {number} orderIndex - Thứ tự hiển thị của đối tượng học tập
   * @return {Promise<number>} - ID của đối tượng học tập mới được tạo
   * */
  async createTarget(courseId, content, orderIndex) {
    const query =
      "INSERT INTO course_targets (courseId, content, orderIndex) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [courseId, content, orderIndex]);
    return result.insertId;
  }

  /**
   * Lấy danh sách đối tượng học tập của khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Array>} - Danh sách đối tượng học tập của khóa học
   * */
  async getTargetsByCourseId(courseId) {
    const query = "SELECT * FROM course_targets WHERE courseId = ?";
    const [rows] = await pool.query(query, [courseId]);
    return rows;
  }

  /**
   * Cập nhật đối tượng học tập của khóa học
   * @param {number} targetId - ID của đối tượng học tập cần cập nhật
   * @param {string} content - Nội dung mới của đối tượng học tập
   * @param {number} orderIndex - Thứ tự hiển thị mới của đối tượng học tập
   * @return {Promise<void>}
   * */
  async updateTarget(targetId, content, orderIndex) {
    const query =
      "UPDATE course_targets SET content = ?, orderIndex = ? WHERE id = ?";
    await pool.query(query, [content, orderIndex, targetId]);
  }

  /**
   * Xóa đối tượng học tập của khóa học
   * @param {number} targetId - ID của đối tượng học tập cần xóa
   * @return {Promise<void>}
   * */
  async deleteTarget(targetId) {
    const query = "DELETE FROM course_targets WHERE id = ?";
    await pool.query(query, [targetId]);
  }
}

module.exports = new CourseTargetRepository();
