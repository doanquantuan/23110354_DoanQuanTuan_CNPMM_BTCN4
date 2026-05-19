import { lessonAPI } from "../../services/sectionAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLessonsBySectionId = createAsyncThunk(
  "lesson/fetchLessonsBySectionId",

  async (sectionId, thunkAPI) => {
    try {
      const res = await lessonAPI.getLessonsBySectionId(sectionId);

      console.log(res.data);

      return {
        sectionId,
        lessons: res.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  lessonsBySection: {},
  loading: false,
  error: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsBySectionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonsBySectionId.fulfilled, (state, action) => {
        state.loading = false;
        const { sectionId, lessons } = action.payload;
        state.lessonsBySection[sectionId] = lessons;
      })
      .addCase(fetchLessonsBySectionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch lessons";
      });
  },
});

export default sectionSlice.reducer;
