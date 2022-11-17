import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Test from "../test/Test";
import Success from "./../success/Success";
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
      {/* <Routes>
        <Route path="/" element={<Success />} />
        <Route path="/success" element={<Success />} />
        <Route path="/test" element={<Test />} />
      </Routes> */}
    </>
  );
}

export default Dashboard;
