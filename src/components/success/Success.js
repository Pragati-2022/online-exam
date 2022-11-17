import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Success() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (
      user?.email &&
      user?.result &&
      user?.testStatus?.toLowerCase() === "complete"
    ) {
      navigate(`/result`);
    } else if (!user?.email) {
      navigate(`/register`);
    } else if (user?.testStatus?.toLowerCase() === "inprogress") {
      navigate('/test');
    }
  }, [user, location?.pathname]);

  const handleStartTest = () => {
    if (user?.email) {
      navigate(`/test`);
      let newUser = {
        ...user,
        testStatus: "inprogress",
      };

      localStorage.setItem("userDetails", JSON.stringify(newUser));
      setUser(newUser);

      console.log("user", user);
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
