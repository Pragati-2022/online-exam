import React from "react";

export const UserContext = React.createContext({
  step: "",
  email: "",
  pauseTime: "",
  testStatus: "onhold",
  result: null,
});