const pool = require("../config/database");

class SectionRepository {
  /**
   * Tạo phần mới cho khóa học
   * @param {number} courseId - ID của khóa học
   * @param {string} title - Tiêu đề của phần
   * @param {number} orderIndex - Thứ tự hiển thị của phần
   * @return {Promise<number>} - ID của phần mới được tạo
   * */
  async createSection(courseId, title, orderIndex) {
    const query =
      "INSERT INTO sections (courseId, title, orderIndex) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [courseId, title, orderIndex]);
    return result.insertId;
  }

  /**
   * Lấy danh sách phần của khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Array>} - Danh sách phần của khóa học
   * */
  async getSectionsByCourseId(courseId) {
    const query =
      "SELECT * FROM sections WHERE courseId = ? ORDER BY orderIndex ASC";
    const [rows] = await pool.query(query, [courseId]);
    return rows;
  }

  /**
   * Cập nhật phần của khóa học
   * @param {number} sectionId - ID của phần cần cập nhật
   * @param {string} title - Tiêu đề mới của phần
   * @param {number} orderIndex - Thứ tự hiển thị mới của phần
   * @return {Promise<void>}
   * */
  async updateSection(sectionId, title, orderIndex) {
    const query = "UPDATE sections SET title = ?, orderIndex = ? WHERE id = ?";
    await pool.query(query, [title, orderIndex, sectionId]);
  }

  /**
   *  Xóa phần của khóa học
   * @param {number} sectionId - ID của phần cần xóa
   * @return {Promise<void>}
   * */
  async deleteSection(sectionId) {
    const query = "DELETE FROM sections WHERE id = ?";
    await pool.query(query, [sectionId]);
  }
}

module.exports = new SectionRepository();
