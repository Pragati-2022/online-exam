import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigatorOnLine } from "../../hooks/navigatorOnline";
import NoInternet from "../../images/NoInternetConnection.png";

function NoInternetConnection(props) {
  const navigate = useNavigate();
  const isOnline = useNavigatorOnLine();

  useEffect(() => {
    console.log("opoo", localStorage.getItem("currentPath"));
    if (isOnline && localStorage.getItem("currentPath"))
      navigate(`${localStorage.getItem("currentPath")}`);
  });

  return (
    <>
      <div className="noInternet align-items-center justify-content-center">
        <p>No Internet Connection!</p>
        <p>Please try again..</p>
        {/* <img src={NoInternet} alt="NotFound" /> */}
      </div>
    </>
  );
}

export default NoInternetConnection;
