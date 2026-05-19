const pool = require("../config/database");

class LessonRepository {
  /**
   * Tạo bài học mới cho khóa học
   * @param {Object} lessonData - Dữ liệu của bài học mới
   * @return {Promise<number>} - ID của bài học mới được tạo
   * */
  async createLesson(lessonData) {
    const {
      courseId,
      title,
      lessonType,
      videoUrl,
      content,
      duration,
      isPreview,
      orderIndex,
    } = lessonData;
    const query =
      "INSERT INTO lessons (courseId, title, lessonType, videoUrl, content, duration, isPreview, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      courseId,
      title,
      lessonType,
      videoUrl,
      content,
      duration,
      isPreview,
      orderIndex,
    ]);
    return result.insertId;
  }

  /**
   * Lấy danh sách bài học của khóa học
   * @param {number} courseId - ID của khóa học
   * @return {Promise<Array>} - Danh sách bài học của khóa học
   * */
  async getLessonsBySectionId(sectionId) {
    const query = "SELECT * FROM lessons WHERE sectionId = ? ORDER BY id ASC";
    const [rows] = await pool.query(query, [sectionId]);
    return rows;
  }

  /**
   * Cập nhật bài học của khóa học
   * @param {number} lessonId - ID của bài học cần cập nhật
   * @param {Object} lessonData - Dữ liệu mới của bài học
   * @return {Promise<void>}
   * */
  async updateLesson(lessonId, lessonData) {
    const {
      courseId,
      title,
      lessonType,
      videoUrl,
      content,
      duration,
      isPreview,
      orderIndex,
    } = lessonData;
    const query =
      "UPDATE lessons SET courseId = ?, title = ?, lessonType = ?, videoUrl = ?, content = ?, duration = ?, isPreview = ?, orderIndex = ? WHERE id = ?";
    await pool.query(query, [
      courseId,
      title,
      lessonType,
      videoUrl,
      content,
      duration,
      isPreview,
      orderIndex,
      lessonId,
    ]);
  }

  /**
   * Xóa bài học của khóa học
   * @param {number} lessonId - ID của bài học cần xóa
   * @return {Promise<void>}
   * */
  async deleteLesson(lessonId) {
    const query = "DELETE FROM lessons WHERE id = ?";
    await pool.query(query, [lessonId]);
  }
}

module.exports = new LessonRepository();
