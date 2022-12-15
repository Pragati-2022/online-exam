import "./App.css";
import Registration from "./components/basic/Registration/Registration";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
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
      <div className="noInternet container">
        <div className="shadow bg-white px-5 py-14 text-center my-12 mx-auto max-w-[700px] rounded-2xl">
          <div className="w-[100px] h-[100px] flex mx-auto bg-red-100 rounded-full items-center justify-center text-black mb-5 border border-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <path d="M2 42 24 4l22 38Zm5.2-3h33.6L24 10Zm17-2.85q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425Q22.7 34 22.7 34.65q0 .65.425 1.075.425.425 1.075.425Zm-1.5-5.55h3V19.4h-3Zm1.3-6.1Z" />
            </svg>
          </div>
          <div className="text-[50px] md:text-[80px] lg:text-[100px] leading-[1] font-[800] text-black mb-3">
            404
          </div>
          <h4 className="text-red-600 text-[40px] font-[600]">
            Page Not Found
          </h4>
        </div>
      </div>
    </>
  );
}

function AppRouter(props) {
  const isOnline = useNavigatorOnLine();
  const location = useLocation();
  const navigate = useNavigate();
  const [isQuiz, setIsQuiz] = useState(false);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    contextValue.dispatch({ type: "GET_USER" });
  }, []);

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

    if (location.pathname.includes("quiz")) {
      setIsQuiz(true);
    } else {
      setIsQuiz(false);
    }
  }, [isQuiz, location.pathname]);

  return (
    <>
      {!isQuiz && <Header />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            !localStorage.getItem("userEmail") ? (
              <Registration />
            ) : (
              <Navigate to="/start_test" />
            )
          }
        />
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
