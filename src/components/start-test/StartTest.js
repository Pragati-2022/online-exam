import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function StartTest() {
  const navigate = useNavigate();
  const contextValue = useContext(UserContext);

  useEffect(() => {
    let addDetails = {
      step: "start_test",
    };
    contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
  }, []);

  const handleStartTest = () => {
    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.testStatus !== "complete"
    ) {
      navigate(`/quiz`);
      const addDetails = {
        testStatus: "inprogress",
      };
      localStorage.setItem("userEmail", "quiz");
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (contextValue.newUser?.testStatus === "complete") {
      navigate(`/result`);
    }
  };

  return (
    <>
      <main className="main-wrap pb-7">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-header-title">General Instruction</h3>
            </div>
            <div className="card-body">
              <ul className="list-type m-0 p-0">
                <li>30 Question asked for an aptitude test</li>
                <li>45 minutes for aptitude test</li>
                <li>One mark for each correct answer</li>
                <li>No negative marking</li>
                <li>
                  In mulitiple choice questions select only needed answers
                </li>
              </ul>
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => handleStartTest()}
                >
                  <span className="btn-text">Start Test</span>
                  <span className="btn-icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default StartTest;
