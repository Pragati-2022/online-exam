import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Result() {
  const contextValue = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    }

    if (contextValue.newUser?.email && contextValue.newUser?.step === "quiz") {
      let addDetails = {
        step: "final",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }

    if (!contextValue.newUser?.step) {
      navigate("/");
    } else if (contextValue.newUser?.step === "instruction") {
      navigate("/register");
    }
  }, [contextValue.newUser, location?.pathname]);

  return (
    <>
      <h1>You are completed test successfully!</h1>
    </>
  );
}

export default Result;
