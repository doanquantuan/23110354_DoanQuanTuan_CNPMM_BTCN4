import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseAPI, sectionAPI } from "../../services/courseAPI";

// Async thunks
export const fetchCourseDetail = createAsyncThunk(
  "course/fetchCourseDetail",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourseDetail(courseId);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Không thể lấy thông tin khóa học",
      );
    }
  },
);

export const fetchCourseSections = createAsyncThunk(
  "course/fetchCourseSections",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await sectionAPI.getSectionsByCourseId(courseId);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Không thể lấy thông tin chương",
      );
    }
  },
);

const initialState = {
  courseDetail: null,
  sections: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.courseDetail = action.payload;
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourseSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchCourseSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
