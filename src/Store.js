import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './Feature/TaskSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;