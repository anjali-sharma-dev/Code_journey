import api from '../utils/api'; // ✅ relative import

// Problem service functions
const problemService = {
  // Get all topics
  getTopics: async () => {
    try {
      const response = await api.get('/topic/get');
      return response.data;
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }
  },

  // Get questions by topic and level
  getQuestionsByTopicAndLevel: async (topicId, level) => {
    try {
      const response = await api.get(`/question/get/${topicId}?level=${level}`);
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching ${level} questions for topic ${topicId}:`, error);
      throw error;
    }
  },

  // Update question solved status
  updateQuestionSolvedStatus: async (questionId, solved) => {
    try {
      const response = await api.patch(`/questions/${questionId}/solved`, { solved });
      return response.data;
    } catch (error) {
      console.error('Error updating solved status:', error);
      throw error;
    }
  },

  // Update question starred status
  updateQuestionStarredStatus: async (questionId, starred) => {
    try {
      const response = await api.patch(`/questions/${questionId}/starred`, { starred });
      return response.data;
    } catch (error) {
      console.error('Error updating starred status:', error);
      throw error;
    }
  },
  
  // Get user progress
  getUserProgress: async () => {
    try {
      const response = await api.get('/user/progress');
      return response.data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  }
};

export default problemService;