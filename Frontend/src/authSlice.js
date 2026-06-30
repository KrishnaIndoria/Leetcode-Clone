import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'slice1',
    initialState:{user:null,loading:false,error:null,isauthenticated:false},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase()
    }
})
