import "./App.css";
import Registration from "./components/basic/Registration/Registration";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Success from "./components/success/Success";
import Test from "./components/test/Test";
import Header from "./components/common/header/Header";
import Result from "./components/result/Result";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import { UserContext } from "./components/context/UserContext";

function NotFound() {
  return <h3>Not Found</h3>;
}

function AppRouter() {
  const location = useLocation();
  const [isStartTest, setStartTest] = useState(false);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    contextValue.dispatch({ type: "GET_USER"});
  }, []);

  useEffect(() => {
    setStartTest(
      location.pathname.includes("/test") ||
        location.pathname.includes("/result")
    );
  }, [location]);

  return (
    <>
      <Header />
      {!isStartTest && <Dashboard />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/success" element={<Success />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/:id" element={<Test />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;
