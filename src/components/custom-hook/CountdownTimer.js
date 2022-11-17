import { useEffect, useRef, useState } from "react";

const useCountdown = (targetDate) => {
  let intervalId = useRef(null);
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    // console.log(new Date().getTime());
    return () => clearInterval(intervalId.current);
  }, []);

  return getReturnValues(countDown, intervalId.current);
};

const getReturnValues = (countDown, interval) => {
  // console.log(countDown, new Date().getTime());
  // const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  if (hours + minutes + seconds <= 0) {
    clearInterval(interval);
    return [0, 0, 0];
  } else return [hours, minutes, seconds];
};

export { useCountdown };
