import "./App.css";
import NotFoundImg from "./images/404.png";
import Registration from "./components/basic/Registration/Registration";
import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import StartTest from "./components/start-test/StartTest";
import Quiz from "./components/quiz/Quiz";
import Header from "./components/common/header/Header";
import Result from "./components/result/Result";
import { UserContext } from "./components/context/UserContext";
import NoInternetConnection from "./components/no-internet-connection/NoInternetConnection";
import { useNavigatorOnLine } from "./hooks/navigatorOnline";

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
  const isOnline = useNavigatorOnLine();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOnline) {
      console.log(isOnline);
      navigate("/no_internet");
    }
  }, [isOnline]);

  useEffect(() => {
    if (location.pathname !== "/no_internet") {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/start_test" element={<StartTest />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/no_internet" element={<NoInternetConnection />} />
        <Route path="*" element={<NotFound status={404} />} />
      </Routes>
    </>
  );
}

export default AppRouter;
