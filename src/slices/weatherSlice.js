import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    foreCast : {},
    loading : false
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (coords) => {
    let apiKey = "07df1a41cb1bc97189c7685b087c9029"
    let baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}&units=metric`
    try{
        const response = await fetch(baseUrl)
        return await response.json();
    }
    catch (error) {
        return error;
    }
  })
  

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchWeather.pending]: (state) => {
            state.loading = true
          },
        [fetchWeather.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.foreCast = payload
        },
        [fetchWeather.rejected]: (state) => {
        state.loading = false
        },
          
    },
        
})

export const {
    saveWeather
  } = weatherSlice.actions
  
  export default weatherSlice.reducer
  