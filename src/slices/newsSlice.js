import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NEWS_KEY } from "../config";

const initialState = {
  enitities: {},
  loading: false,
  pageSize: 10,
  page: 1,
  searchTerm: "",
  language: "en",
};

const getData = async (getState,rejectWithValue) => {
  let { news } = getState();
  let searchTerm = news.searchTerm
    ? `&q=${news.searchTerm}&searchIn=Title`
    : "";
  let language = news.language || "en";
  let url = `https://newsapi.org/v2/top-headlines?language=${language}${searchTerm}&pageSize=${news.pageSize}&page=${news.page}&sortBy=publishedAt&apiKey=${NEWS_KEY}`;
  if (news.page <= 10) {
    //news api is developer more. Have resttictions above 100 results.
    try {
      const resp = await fetch(url);
      const parsedResp = await resp.json();
      if(parsedResp.status != 'ok')
        rejectWithValue('')
      return parsedResp
    } catch (error) {
      return error;
    }
  }
  else{
    rejectWithValue('')
  }
};

//fetchNews thunk is to fetch the new for the firt time and while searching using filters, it reset the page and data
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (filters, { getState, rejectWithValue }) => {
    return await getData(getState,rejectWithValue);
  }
);
//fetchMore thunk is to append the next page result to the existing store
export const fetchMore = createAsyncThunk(
  "news/fetchMore",
  async (filters, { getState }) => {
    return getData(getState);
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updatePage(state, action) {
      state.page = state.page + 1;
    },
    updateFilter(state, action) {
      state.searchTerm = action.payload.search;
      state.language = action.payload.lang;
      state.page = 1;
    },
    updateLoading(state, action) {
      state.loading = true;
    }

  },
  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.loading = true;
    },
    [fetchNews.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.enitities = payload;
    },
    [fetchNews.rejected]: (state) => {
      state.loading = false;
    },
    [fetchMore.pending]: (state) => {
      state.loading = true;
    },
    [fetchMore.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload)
        state.enitities.articles = [
          ...state.enitities.articles,
          ...payload.articles,
        ];
    },
    [fetchMore.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { updatePage, updateFilter, updateLoading } = newsSlice.actions;

export default newsSlice.reducer;
