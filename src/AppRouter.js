import "./App.css";
import NotFoundImg from "./images/404.png";
import Registration from "./components/basic/Registration/Registration";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import StartTest from "./components/start-test/StartTest";
import Quiz from "./components/quiz/Quiz";
import Header from "./components/common/header/Header";
import Result from "./components/result/Result";
import Dashboard from "./components/dashboard/Dashboard";
import { UserContext } from "./components/context/UserContext";
import Instruction from "./components/instruction/Instruction";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const contextValue = useContext(UserContext);
  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    }
  }, [contextValue.newUser, location?.pathname]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center h-100 mt-5">
        <img src={NotFoundImg} alt="NotFound" />
      </div>
    </>
  );
}

function AppRouter(props) {
  const location = useLocation();
  const [isStartTest, setStartTest] = useState(false);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    contextValue.dispatch({ type: "GET_USER" });
  }, []);

  useEffect(() => {
    setStartTest(
      location.pathname.includes("/quiz") ||
        location.pathname.includes("/result")
    );
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Dashboard />
              <Instruction />
            </React.Fragment>
          }
        />
        <Route
          path="/register"
          element={
            <React.Fragment>
              <Dashboard />
              <Registration />
            </React.Fragment>
          }
        />
        <Route
          path="/start_test"
          element={
            <React.Fragment>
              <Dashboard />
              <StartTest />
            </React.Fragment>
          }
        />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound status={404} />} />
      </Routes>
    </>
  );
}

export default AppRouter;
