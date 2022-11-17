import React from "react";
import { useCountdown } from "./custom-hook/CountdownTimer";

const Countdown = ({
  targetTime,
  handleEndTest,
  updateHours,
  updateMinutes,
  updateSeconds,
}) => {
  const [hours, minutes, seconds] = useCountdown(targetTime);

  if (hours + minutes + seconds === 0) {
    return handleEndTest();
  } else {
    updateHours(hours);
    updateMinutes(minutes);
    updateSeconds(seconds);
    return (
      <>
        <h1>
          {hours} : {minutes} : {seconds}
        </h1>
      </>
    );
  }
};

export default Countdown;
