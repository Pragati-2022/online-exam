import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import {
  UserContextProvider,
} from "./components/context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
