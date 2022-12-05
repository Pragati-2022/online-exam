import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Countdown from "../CountDown";

function StartTest() {
  const LIMIT_IN_MS = 20 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterLimit = NOW_IN_MS + LIMIT_IN_MS;
  const MS = {
    HOURS: 3600000,
    MINUTES: 60000,
    SECOND: 1000,
  };
  const navigate = useNavigate();
  const contextValue = useContext(UserContext);
  const location = useLocation();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    return () => {
      const newTime = JSON.parse(localStorage.getItem("startTesttimer")) || {};
      const newTimeInMs =
        newTime?.hours * MS.HOURS +
        newTime?.minutes * MS.MINUTES +
        newTime?.seconds * MS.SECOND;

      let addDetails = {
        timer: newTimeInMs + NOW_IN_MS,
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    };
  }, []);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    } else if (
      contextValue.newUser?.testStatus?.toLowerCase() === "complete" ||
      contextValue.newUser?.step?.toLowerCase() === "final"
    ) {
      navigate("/result");
    }

    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.step === "enter_details"
    ) {
      let addDetails = {
        step: "start_test",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (!contextValue.newUser?.email) {
      navigate("/");
    }
  }, [contextValue.newUser, location?.pathname]);

  useEffect(() => {
    if (!hours && !minutes && !seconds) return;
    if (
      contextValue.newUser?.step?.toLowerCase() === "start_test" &&
      !contextValue.newUser?.startTestDelay
    ) {
      localStorage.setItem(
        "startTesttimer",
        JSON.stringify({ hours: hours, minutes: minutes, seconds: seconds })
      );
    }
  }, [hours, minutes, seconds]);

  const handleStartTest = () => {
    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.testStatus !== "complete"
    ) {
      navigate(`/quiz`);
      const addDetails = {
        testStatus: "inprogress",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (contextValue.newUser?.testStatus === "complete") {
      navigate(`/result`);
    }

    let addDetails = {
      timer: 0,
      startTestDelay: true,
    };
    localStorage.removeItem("startTesttimer");
    contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
  };

  const handleEndTest = () => {
    let addDetails = {
      // timer: 0,
      startTestDelay: true,
    };
    // localStorage.removeItem("startTesttimer");
    contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
  };

  return (
    <>
      <div></div>
      <div className="cng-success-fix">
        {/* <h2>Congratulations! Successfully registered!</h2> */}
        <h5>
          <strong> Use this time to read the instructions</strong>
        </h5>
        <hr />

        <div className="card text-center">
          <div className="card-body">
            <div className="card-text mt-3">
              You can start solving problem in
              {/* <span>
                {!contextValue.newUser?.startTestDelay ? (
                  <Countdown
                    key={"startTest"}
                    targetTime={dateTimeAfterLimit}
                    handleEndTest={handleEndTest}
                    updateHours={(e) => setHours(e)}
                    updateMinutes={(e) => setMinutes(e)}
                    updateSeconds={(e) => setSeconds(e)}
                  />
                ) : null}
                {hours + minutes + seconds == 1 ||
                contextValue.newUser?.startTestDelay ? (
                  <span> now</span>
                ) : null}
              </span> */}
            </div>
            {/* disabled={
                !(hours + minutes + seconds <= 1) ||
                !contextValue.newUser?.startTestDelay
              } */}
            <button
              type="submit"
              className="btn btn-success mt-2"
              onClick={() => handleStartTest()}
            >
              Start Test
            </button>
          </div>
        </div>

        <div>
          <h3>General Instructions</h3>
          <ul>
            <li>30 Question asked for an aptitude test</li>
            <li>45 minutes for aptitude test</li>
            <li>One mark for each correct answer</li>
            <li>No negative marking</li>
            <li>In mulitiple choice questions select only needed answers</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default StartTest;
