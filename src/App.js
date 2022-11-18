import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { UserContext } from "./components/context/UserContext";

const initialState = {
  step: "",
  email: "",
  pauseTime: "",
  testStatus: "onhold",
  result: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER":
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ ...state, ...action.payload })
      );
      return { ...state, ...action.payload };
    case "GET_USER":
      let getUser = JSON.parse(localStorage.getItem("userDetails")) || {};
      return { ...state, ...getUser };
    default:
      return state;
  }
}

function App() {
  const [newUser, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "GET_USER" });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          newUser: newUser,
          dispatch: dispatch,
        }}
      >
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
