import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import statService from './statService'

// Get user
const user = JSON.parse(localStorage.getItem('stats'))

const initialState = {
    stats: stats ? stats : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//get stats
export const getStats = createAsyncThunk('stats/get', async (stats, thunkAPI) => {
    try {
        return await statService.getStats(stats)
    } catch (error) {
        const message =   (error.response && error.response.data && error.response.data.message)
                        || error.message 
                        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

//update stats
export const updateStats = createAsyncThunk('stats/update', async (stats, thunkAPI) => {
    try {
        return await statService.updateStats(stats)
    } catch (error) {
        const message =   (error.response && error.response.data && error.response.data.message)
                        || error.message 
                        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})


export const statSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        },
        logout: (state) => {
            state.stats = null
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateStats.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(updateStats.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stats = action.payload
            })
            .addCase(updateStats.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.stats = null
            })
            /*.addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })*/
    }
})


export const {reset} = authSlice.actions
export const {logout} = authSlice.actions
export default authSlice.reducer