import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (user?.email && user?.result) {
      navigate(`/result`);
    } else if (user?.testStatus?.toLowerCase() === "inprogress") {
      navigate('/test');
    } else if (user?.testStatus?.toLowerCase() === "complete") {
      navigate("/result");
    }
  }, [user, location?.pathname]);

  const handleSubmit = () => {
    if (user?.email && user?.result) {
      navigate(`/result`);
    } else if (user?.email && !user?.result) {
      navigate(`/success`);
    } else {
      navigate(`/register`);
    }
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
