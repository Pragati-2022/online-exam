import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleNext = (next) => {
    navigate(`/${next}`);
  };
  return (
    <>
      <div>
        <h1 onClick={() => handleNext("")}>
          <span>1</span> Instruction
        </h1>
        <h1 onClick={() => handleNext("register")}>
          <span>2</span> Enter Details
        </h1>
        <h1 onClick={() => handleNext("success")}>
          <span>3</span> Start Test
        </h1>
        <h1 onClick={() => handleNext("test")}>
          <span>4</span> Quiz
        </h1>
      </div>
    </>
  );
}

export default Dashboard;
