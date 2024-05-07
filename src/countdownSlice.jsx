import { createSlice, 
  // createAction
 } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

// const setCurrentTimeAction = createAction('countdown/setCurrentTime');
// const setTargetDateAction = createAction('countdown/setTargetDate');

const countdownSlice = createSlice({
  name: "countdown",
  initialState: {
    timer: {
      targetDate: null,
      currentTime: Date.now(),
    },
  },
  reducers: {
    setCurrentTime(state, action) {
      state.timer.currentTime = action.payload;
    },
    setTargetDate(state, action) {
      state.timer.targetDate = action.payload;
    },
  },
});

export const { setCurrentTime, setTargetDate } = countdownSlice.actions;

export default countdownSlice.reducer;

export const selectTimer = (state) => state.countdown.timer;

export const selectTargetDate = createSelector(
  selectTimer,
  (timer) => timer.targetDate
);

export const selectCurrentTime = createSelector(
  selectTimer,
  (timer) => timer.currentTime
);

export const selectTimeRemaining = createSelector(
  [selectTargetDate, selectCurrentTime],
  (targetDate, currentTime) => calculateTimeRemaining(targetDate, currentTime)
);

export const calculateTimeRemaining = (targetDate, currentTime) => {
  // Calculate the time remaining until the target date
  const remaining = targetDate - currentTime;

  // If the remaining time is negative or zero, return all zeros for days, hours, minutes, and seconds
  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // If there's time remaining, calculate days, hours, minutes, and seconds
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  // Return the calculated time remaining
  return { days, hours, minutes, seconds };
};

// export const calculateTimeRemaining = (targetDate, currentTime) => {
//     // Calculate the time remaining until the target date
//     const remaining = targetDate - currentTime;
  
//     // If the remaining time is negative or zero, return 0 for minutes and seconds
//     if (remaining <= 0) {
//       return { minutes: 0, seconds: 0 };
//     }
  
//     // If there's time remaining, calculate minutes and seconds
//     const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  
//     // Return the calculated time remaining
//     return { minutes, seconds };
// };  

export const checkAndUpdateTime = (dispatch) => {
  const storedTargetDate = localStorage.getItem("countdownTargetDate");
  const storedStartTime = localStorage.getItem("countdownStartTime");

  if (storedTargetDate && storedStartTime) {
    const elapsedTime = Date.now() - parseInt(storedStartTime);
    if (elapsedTime >= 2 * 60 * 1000) {
      // More than 2 minutes have passed since the target date was set
      const newTargetDate = Date.now() + 2 * 60 * 1000; // Set target date 2 minutes from now
      dispatch(setTargetDate(newTargetDate));
      localStorage.setItem("countdownTargetDate", newTargetDate.toString());
      localStorage.setItem("countdownStartTime", Date.now().toString());
    } else {
      // Less than 2 minutes have passed, use the stored target date
      dispatch(setTargetDate(parseInt(storedTargetDate)));
    }
  } else {
    // Target date not set, set it for the first time
    const newTargetDate = Date.now() + 2 * 60 * 1000; // Set target date 2 minutes from now
    dispatch(setTargetDate(newTargetDate));
    localStorage.setItem("countdownTargetDate", newTargetDate.toString());
    localStorage.setItem("countdownStartTime", Date.now().toString());
  }
};
