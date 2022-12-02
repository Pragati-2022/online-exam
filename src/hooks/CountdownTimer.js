import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../components/context/UserContext";
import { useNavigatorOnLine } from "./navigatorOnline";

const useCountdown = (targetDate) => {
  const contextValue = useContext(UserContext);
  const isOnline = useNavigatorOnLine();

  if (contextValue.newUser?.timer > 100000) {
    targetDate = contextValue.newUser?.timer;
  }
  let intervalId = useRef(null);
  var countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (!contextValue.newUser?.pauseInterval) {
      intervalId.current = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    if (!isOnline) {
      clearInterval(intervalId.current);
    }
  }, [isOnline]);

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
