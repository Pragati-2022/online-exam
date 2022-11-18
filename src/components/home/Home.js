import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const contextValue = useContext(UserContext);

  useEffect(() => {
    let getData = JSON.parse(localStorage.getItem("userDetails")) || {};
    contextValue.dispatch({ type: "UPDATE_USER", payload: getData });
  }, []);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/test");
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
      <h1>Home</h1>
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

export default Home;
