const pool = require("../config/database");

class CourseRepository {
  /**
   * Tạo khóa học mới
   * @param {Object} courseData - Dữ liệu của khóa học mới
   * @return {Promise<number>} - ID của khóa học mới được tạo
   */
  async createCourse(courseData) {
    const { title, description, price, slug, thumbnail, status } = courseData;
    const query =
      "INSERT INTO courses (title, description, price, slug, thumbnail, status) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      title,
      description,
      price,
      slug,
      thumbnail,
      status,
    ]);
    return result.insertId;
  }

  /**
   * Lấy chi tiết khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Object|null>} - Thông tin chi tiết của khóa học hoặc null nếu không tìm thấy
   */
  async getCourseById(courseId) {
    const query = "SELECT * FROM courses WHERE id = ?";
    const [rows] = await pool.query(query, [courseId]);
    return rows[0] || null;
  }

  /**
   * Cập nhật thông tin khóa học
   * @param {number} courseId - ID của khóa học cần cập nhật
   * @param {Object} courseData - Dữ liệu mới của khóa học
   * @return {Promise<void>}
   * */

  async updateCourse(courseId, courseData) {
    const { title, description, price, slug, thumbnail, status } = courseData;
    const query =
      "UPDATE courses SET title = ?, description = ?, price = ?, slug = ?, thumbnail = ?, status = ? WHERE id = ?";
    await pool.query(query, [
      title,
      description,
      price,
      slug,
      thumbnail,
      status,
      courseId,
    ]);
  }
}

module.exports = new CourseRepository();
