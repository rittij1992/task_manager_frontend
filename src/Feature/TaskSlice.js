import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../Api/AxiosInstance';

// API base URL
const API_URL = `${process.env.REACT_APP_API_URL}/tasks/allTasks`;


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(API_URL);
    // console.log(response.data);
    return response.data.tasks;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetTasks: (state) => {
            state.items = [];
            state.status = 'idle';
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetTasks, setStatus } = taskSlice.actions;
export default taskSlice.reducer;