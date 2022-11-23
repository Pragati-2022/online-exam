import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";

const NOW_IN_MS = new Date().getTime();

const useCountdown = (targetTime) => {
  const contextValue = useContext(UserContext);
  const TIMER_IN_MS = NOW_IN_MS + contextValue.newUser?.timer;
  if (contextValue.newUser?.timer > 0) {
    targetTime = TIMER_IN_MS;
  }
  let intervalId = useRef(null);
  var countDownTime = new Date(targetTime).getTime();

  const [countDown, setCountDown] = useState(
    countDownTime - new Date().getTime()
  );

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCountDown(countDownTime - new Date().getTime());
    }, 1000);
    return () => clearInterval(intervalId.current);
  }, [contextValue.newUser?.timer ? targetTime : null]);

  return getReturnValues(countDown, intervalId.current);
};

const getReturnValues = (countDown, interval) => {
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  if (hours + minutes + seconds <= 0) {
    clearInterval(interval);
    return [0, 0, 0];
  } else
    return [
      hours < 10 ? "0" + hours : hours,
      minutes < 10 ? "0" + minutes : minutes,
      seconds < 10 ? "0" + seconds : seconds,
    ];
};

export { useCountdown };
