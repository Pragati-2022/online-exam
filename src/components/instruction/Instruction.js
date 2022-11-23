import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Instruction() {
  const navigate = useNavigate();
  const location = useLocation();
  const contextValue = useContext(UserContext);

  useEffect(() => {
    let getData = JSON.parse(localStorage.getItem("userDetails")) || {};
    contextValue.dispatch({ type: "UPDATE_USER", payload: getData });
  }, []);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    } else if (contextValue.newUser?.testStatus?.toLowerCase() === "complete") {
      navigate("/result");
    }

    if (!contextValue.newUser?.step) {
      let addDetails = {
        step: "instruction",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (contextValue.newUser?.step === "enter_details") {
      navigate("/register");
    } else if (contextValue.newUser?.step === "start_test") {
      navigate("/start_test");
    } 
  }, [contextValue.newUser, location?.pathname]);

  const handleSubmit = () => {
    navigate(`/register`);
  };

  return (
    <>
      <div className="homepage-main">
        <div className="container">
          <div className="homepage-inner">
            <h2>React JS Quiz</h2>
            <ul style={{ listStyleType: "none" }}>
              <li>
                By <strong>Atharva System</strong>
              </li>
              <li>
                Duration <strong>60 mins</strong>
              </li>
            </ul>
          </div>
          <div className="homepage-inner">
            <h3>General Instructions</h3>
            <ul>
              <li>Test duration : 60 mins</li>
              <li>
                Duration <strong>60 Minutes</strong>
              </li>
              <li>
                Click <strong>End Test</strong> after you answer each questions
              </li>
              <li>
                <strong>30</strong> Questions
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => handleSubmit()}
          >
            Enter Test
          </button>
        </div>
      </div>
    </>
  );
}

export default Instruction;
