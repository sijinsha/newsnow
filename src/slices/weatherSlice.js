import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    foreCast : {}
}

// export const getWeatherdetails = createAsyncThunk('weather/fetchWeather', async (coords) => {
//     let apiKey = "07df1a41cb1bc97189c7685b087c9029"
//     let baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}`
//     const response = await fetch(baseUrl)
//     return await response.json();
//   })
  

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        saveWeather(state, action) {
            state.foreCast = action.payload;
          },
    },
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchWeather.fulfilled, (state, action) => {
    //         state.foreCast = action.payload
    //       })
          
    // },
        
})

export const {
    saveWeather
  } = weatherSlice.actions
  
  export default weatherSlice.reducer
  