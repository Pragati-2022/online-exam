import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Dashboard(props) {
  const contextValue = useContext(UserContext);
  const colorsClass = {
    instruction: "instruction",
    enter_details: "enter_details",
    start_test: "start_test",
    quiz: "quiz",
    final: "final",
  };

  const handleNext = (next) => {
    // navigate(`/${next}`);
  };
  return (
    <React.Fragment>
      <div className="steplist-main">
        <div
          className={[
            "stepitem stepitem-intro",
            colorsClass[contextValue?.newUser?.step],
          ].join(" ")}
          onClick={() => handleNext("")}
        >
          <span className="stepno">1</span>{" "}
          <span className="label">Instruction</span>
        </div>
        <div
          className={[
            "stepitem stepitem-register",
            colorsClass[contextValue?.newUser?.step],
          ].join(" ")}
          onClick={() => handleNext("register")}
        >
          <span className="stepno">2</span>
          <span className="label">Enter Details</span>
        </div>
        <div
          className={[
            "stepitem stepitem-success",
            colorsClass[contextValue?.newUser?.step],
          ].join(" ")}
          onClick={() => handleNext("success")}
        >
          <span className="stepno">3</span>
          <span className="label">Start Test</span>
        </div>
        <div
          className={[
            "stepitem stepitem-test",
            colorsClass[contextValue?.newUser?.step],
          ].join(" ")}
          onClick={() => handleNext("quiz")}
        >
          <span className="stepno">4</span>
          <span className="label">Quiz</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
