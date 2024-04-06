import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime, calculateTimeRemaining, checkAndUpdateTime } from "./countdownSlice";
import './App.css'

const Countdown = () => {
  const dispatch = useDispatch();
  const { targetDate, currentTime } = useSelector((state) => state.countdown.timer);

  useEffect(() => {
    checkAndUpdateTime(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // Set up a timer interval to update the current time every second
    const intervalId = setInterval(() => {
      // Dispatch an action to update the current time in the Redux store
      dispatch(setCurrentTime(Date.now()));
    }, 1000);

    // Clean up function: clear the timer interval when the component unmounts or rerenders
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);
  
  const { days, hours, minutes, seconds } = calculateTimeRemaining(targetDate, currentTime);
  // const { minutes, seconds } = calculateTimeRemaining(targetDate, currentTime);

  // const displayTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const displayTime = `${days > 0 ? days + 'd ' : ''}${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div>
      <h1>Countdown</h1>
      {days || hours || minutes || seconds ? (
        <p className="countdown-container">Remaining time: <span className="countdown-text">{displayTime}</span></p>
      ) : (
        <p className="countdown-container">Restart the timer by reloading the page now</p>
      )}
    </div>
  );
};


export default Countdown;
