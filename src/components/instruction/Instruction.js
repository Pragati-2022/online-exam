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
    }

    if (!contextValue.newUser?.step) {
      let addDetails = {
        step: "instruction",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
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
            <h2>Home page Here</h2>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-success"
        onClick={() => handleSubmit()}
      >
        Enter Test
      </button>
    </>
  );
}

export default Instruction;
