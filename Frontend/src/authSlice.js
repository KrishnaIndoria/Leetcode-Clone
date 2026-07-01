import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import axiosClient from './utils/axiosClient';

export const registerUser = createAsyncThunk(
    'auth/register',
    async(userData,thunkAPI)=>{
        try{
            const response = await axiosClient.post('/user/Register',userData);
            return response.data.user;
        }
        catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',

    async(userData,thunkAPI)=>{
        try{
            const response = await axiosClient.post('/user/login',userData);
            return response.data.user;
        }
        catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/check',

    async(_,thunkAPI)=>{
        try{
            const response = await axiosClient.get('/user/check');
            return response.data.user;
        }
        catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',

    async(_,thunkAPI)=>{
        try{
            await axiosClient.get('/user/logout');
            return null;
        }
        catch(err){
            return thunAPI.rejectWithValue(err.message);
        }
        
    }
)


const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,loading:false,error:null,isauthenticated:false},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
            state.error = false;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isauthenticated = !!action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'something went wrong';
            state.isauthenticated = false;
            state.user = null;
        })

        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.error = false;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isauthenticated = !!action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'something went wrong';
            state.isauthenticated = false;
            state.user = null;
        })

        .addCase(checkAuth.pending,(state)=>{
            state.loading = true;
            state.error = false;

        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isauthenticated = !!action.payload;
        })
        .addCase(checkAuth.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'something went wrong';
            state.isauthenticated = false;
            state.user = null;
        })

        .addCase(logoutUser.pending,(state)=>{
            state.loading = true;
            state.error = false;
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.loading = false;
            state.user = null;
            state.isauthenticated = false;
            state.error = null;
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.error = action.payload?.message || 'something went wrong';
            state.user = null;
            state.isauthenticated = false;
            state.loading = false;
        })
    }
})

export default authSlice.reducer;