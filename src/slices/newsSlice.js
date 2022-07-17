import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {NEWS_KEY} from '../config'

const initialState = {
   enitities : {},
   loading : false,
}

export const fetchNews = createAsyncThunk('news/fetchNews',async (filters) => {
    let searchTerm = filters.search ? `&q=${filters.search}&searchIn=Title` :''
    let language = filters.lang || 'en'
    let url = `https://newsapi.org/v2/top-headlines?language=${language}${searchTerm}&pageSize=20&sortBy=popularity&apiKey=${NEWS_KEY}`
    try{
        const resp = await fetch(url)
        return await resp.json();
    }
    catch(error){
        return error
    }
})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchNews.pending]: (state) => {
            state.loading = true
          },
        [fetchNews.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.enitities = payload
        },
        [fetchNews.rejected]: (state) => {
        state.loading = false
        },
          
    },
        
})

export default newsSlice.reducer