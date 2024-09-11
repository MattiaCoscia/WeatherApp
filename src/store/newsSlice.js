import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '952677781dfa42a2835769b0c9de31db';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  return response.data.articles;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
