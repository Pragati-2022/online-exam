import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Success() {
  const navigate = useNavigate();
  const contextValue = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/test");
    }

    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.step === "enter_details"
    ) {
      let addDetails = {
        step: "start_test",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (
      !contextValue.newUser?.email &&
      contextValue.newUser?.step === "enter_details"
    ) {
      navigate("/register");
    }

    if (!contextValue.newUser?.step) {
      navigate("/");
    } else if (contextValue.newUser?.step === "instruction") {
      navigate("/register");
    }
  }, [contextValue.newUser, location?.pathname]);

  const handleStartTest = () => {
    if (contextValue.newUser?.email) {
      navigate(`/test`);
      let addDetails = {
        testStatus: "inprogress",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }
  };

  return (
    <>
      <h1>Congratulations! Successfully registered!</h1>
      <button
        type="submit"
        className="btn btn-success"
        onClick={() => handleStartTest()}
      >
        Start Test
      </button>
    </>
  );
}

export default Success;
