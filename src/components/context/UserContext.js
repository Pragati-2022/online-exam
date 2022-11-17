import React, { createContext, useEffect, useReducer, useState } from "react";

// create context
const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [user, setUser] = useState({});
  // const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userDetails")) || {});
  }, []);

  useEffect(() => {
    console.log('test====', user);
  }, [user])

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
