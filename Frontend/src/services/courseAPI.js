import api from "./api";

export const courseAPI = {
  // Fetch course detail by ID
  getCourseDetail: async (courseId) => {
    const response = await api.get(`/course/${courseId}`);
    return response.data;
  },
};

export const sectionAPI = {
  // Fetch sections by course ID
  getSectionsByCourseId: async (courseId) => {
    const response = await api.get(`/course/${courseId}/sections`);
    return response.data;
  },
};
