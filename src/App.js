import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { UserContext } from "./components/context/UserContext";
import { QuestionContext } from "./components/context/QuestionsContext";
import axios from "axios";

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

function questionReducer(state, action) {
  switch (action.type) {
    case "UPDATE_QUESTION":
      if (state.length) {
        let index = state.findIndex(
          (data) => data.questionId === action.payload.questionId
        );
        if (index >= 0) {
          state[index] = action.payload;
        } else {
          state = [...state, action.payload];
        }
      } else {
        state = [action.payload];
      }
      return [...state];
    case "CREATE_QUESTION":
      if (!state.length) {
        state = action.payload;
      }
      return [...state];
    case "END_TEST":
      console.log(action.payload);
      axios
        .post(
          `${process.env.REACT_APP_API}/users/test/submit`,
          action.payload
        )
        .then((res) => {
          console.log(res);
        });
      return [...state];
    default:
      return state;
  }
}

function App() {
  const [newUser, dispatch] = useReducer(reducer, initialState);
  const [question, questionDispatch] = useReducer(questionReducer, []);

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
        <QuestionContext.Provider
          value={{
            question: question,
            questionDispatch: questionDispatch,
          }}
        >
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </QuestionContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
