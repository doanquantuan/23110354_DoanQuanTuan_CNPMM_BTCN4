const pool = require("../config/database");

class CourseObjectiveRepository {
  /**
   * Tạo mục tiêu mới cho khóa học
   * @param {number} courseId - ID của khóa học
   * @param {string} content - Nội dung của mục tiêu
   * @param {number} orderIndex - Thứ tự hiển thị của mục tiêu
   * @return {Promise<number>} - ID của mục tiêu mới được tạo
   * */
  async createObjective(courseId, content, orderIndex) {
    const query =
      "INSERT INTO course_objectives (courseId, content, orderIndex) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [courseId, content, orderIndex]);
    return result.insertId;
  }

  /**
   * Lấy danh sách mục tiêu của khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Array>} - Danh sách mục tiêu của khóa học
   * */
  async getObjectivesByCourseId(courseId) {
    const query = "SELECT * FROM course_objectives WHERE courseId = ?";
    const [rows] = await pool.query(query, [courseId]);
    return rows;
  }

  /**
   * Cập nhật mục tiêu của khóa học
   * @param {number} objectiveId - ID của mục tiêu cần cập nhật
   * @param {string} content - Nội dung mới của mục tiêu
   * @param {number} orderIndex - Thứ tự hiển thị mới của mục tiêu
   * @return {Promise<void>}
   * */
  async updateObjective(objectiveId, content, orderIndex) {
    const query =
      "UPDATE course_objectives SET content = ?, orderIndex = ? WHERE id = ?";
    await pool.query(query, [content, orderIndex, objectiveId]);
  }

  /**
   * Xóa mục tiêu của khóa học
   * @param {number} objectiveId - ID của mục tiêu cần xóa
   * @return {Promise<void>}
   * */
  async deleteObjective(objectiveId) {
    const query = "DELETE FROM course_objectives WHERE id = ?";
    await pool.query(query, [objectiveId]);
  }
}

module.exports = new CourseObjectiveRepository();
