// import { setCurrentTime, calculateTimeRemaining, checkAndUpdateTime } from "./countdownSlice";
import './App.css'

import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTargetDate, setCurrentTime, selectTargetDate, selectCurrentTime, checkAndUpdateTime, selectTimeRemaining } from "./countdownSlice";

const Countdown = () => {
  const dispatch = useDispatch();
  // const targetDate = useSelector(selectTargetDate);
  // const currentTime = useSelector(selectCurrentTime);
  const timeRemaining = useSelector(selectTimeRemaining);

  const memoizedTargetDate = useMemo(() => {
    const storedTargetDate = localStorage.getItem("countdownTargetDate");
    if (storedTargetDate) {
      return parseInt(storedTargetDate, 10);
    } else {
      const newTargetDate = Date.now() + 2 * 60 * 1000; // 2 minutes from now
      localStorage.setItem("countdownTargetDate", newTargetDate.toString());
      return newTargetDate;
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(setCurrentTime(Date.now()));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const checkAndUpdateTimeMemoized = useCallback(() => {
    const storedStartTime = localStorage.getItem("countdownStartTime");

    if (storedStartTime) {
      const elapsedTime = Date.now() - parseInt(storedStartTime, 10);
      if (elapsedTime >= 2 * 60 * 1000) {
        const newTargetDate = Date.now() + 2 * 60 * 1000; // Set target date 2 minutes from now
        dispatch(setTargetDate(newTargetDate));
        localStorage.setItem("countdownTargetDate", newTargetDate.toString());
        localStorage.setItem("countdownStartTime", Date.now().toString());
      } else {
        dispatch(setTargetDate(memoizedTargetDate));
      }
    } else {
      const newTargetDate = Date.now() + 2 * 60 * 1000; // Set target date 2 minutes from now
      dispatch(setTargetDate(newTargetDate));
      localStorage.setItem("countdownTargetDate", newTargetDate.toString());
      localStorage.setItem("countdownStartTime", Date.now().toString());
    }
  }, [dispatch, memoizedTargetDate]);

  useEffect(() => {
    checkAndUpdateTimeMemoized();
  }, [checkAndUpdateTimeMemoized]);
  
  // const { days, hours, minutes, seconds } = calculateTimeRemaining(targetDate, currentTime);
  // const { minutes, seconds } = calculateTimeRemaining(targetDate, currentTime);
  
  const { days, hours, minutes, seconds } = timeRemaining;

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
