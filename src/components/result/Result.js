import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Result() {
  const [user, setUser] = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      navigate("/register");
    } else if (user?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/test");
    } else if (user?.testStatus?.toLowerCase() === "onhold") {
      navigate("/success");
    }
  }, [user, location]);

  return (
    <>
      <h1>Result {user?.result}</h1>
    </>
  );
}

export default Result;
