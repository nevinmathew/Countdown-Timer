import { configureStore } from '@reduxjs/toolkit';
import countdownReducer from './countdownSlice';

export default configureStore({
  reducer: {
    countdown: countdownReducer,
  },
});
