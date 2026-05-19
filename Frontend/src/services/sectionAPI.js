import api from "./api";

export const lessonAPI = {
  // Fetch lessons by section ID
  getLessonsBySectionId: async (sectionId) => {
    const response = await api.get(`/section/${sectionId}/lessons`);
    return response.data;
  },
};
