import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "./../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastName = useRef(null);
  const emailRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const educationDetailsRef = useRef(null);
  const areaOfInterestRef = useRef(null);
  const futureGoalRef = useRef(null);
  const currentAddressRef = useRef(null);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/test");
    }

    if (contextValue.newUser?.step === "instruction") {
      let addDetails = {
        step: "enter_details",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }

    if (!contextValue.newUser?.step) {
      navigate("/");
    }
  }, [contextValue.newUser, location?.pathname]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !firstNameRef.current.value ||
      !middleNameRef.current.value ||
      !lastName.current.value ||
      !emailRef.current.value ||
      !dateOfBirthRef.current.value ||
      !educationDetailsRef.current.value ||
      !areaOfInterestRef.current.value ||
      !futureGoalRef.current.value ||
      !currentAddressRef.current.value
    ) {
      setSuccess("");
      setError("Details are required!");
    } else {
      setSuccess("Register successful");
      setError("");

      navigate(`/success`);

      let userDetail = {
        fullName: `${firstNameRef.current.value} ${middleNameRef.current.value} ${lastName.current.value}`,
        email: emailRef.current.value,
        dateOfBirth: dateOfBirthRef.current.value,
        educationDetails: educationDetailsRef.current.value,
        areaOfInterest: areaOfInterestRef.current.value,
        futureGoal: futureGoalRef.current.value,
        currentAddress: currentAddressRef.current.value,
      };

      let addDetails = {
        email: emailRef.current.value,
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }
  };

  return (
    <>
      <h1> Registration </h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <label>Full Name</label>
        <br />
        <div>
          <input
            id="firstName"
            placeholder="FirstName"
            type="text"
            className="form-control"
            ref={firstNameRef}
            required
          />{" "}
          <input
            id="middleName"
            placeholder="MiddleName"
            type="text"
            className="form-control"
            ref={middleNameRef}
            required
          />{" "}
          <input
            id="lastName"
            placeholder="LastName"
            type="text"
            className="form-control"
            ref={lastName}
            required
          />
        </div>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          placeholder="Email"
          type="email"
          className="form-control"
          ref={emailRef}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <label htmlFor="dateOfBirth">Date Of Birth</label>
        <br />
        <input
          id="dateOfBirth"
          placeholder="DateOfBirth"
          type="date"
          className="form-control"
          ref={dateOfBirthRef}
          required
        />
        <label htmlFor="educationDetails">
          Education Details : Last Semester Grade (CGPA)
        </label>
        <br />
        <textarea
          id="educationDetails"
          placeholder="EducationDetails"
          className="form-control"
          ref={educationDetailsRef}
          required
        ></textarea>
        <label htmlFor="areaOfInterest">Area of Interest</label>
        <br />
        <textarea
          id="areaOfInterest"
          placeholder="AreaOfInterest"
          className="form-control"
          ref={areaOfInterestRef}
          required
        ></textarea>
        <label htmlFor="futureGoal">Future Goal</label>
        <br />
        <textarea
          id="futureGoal"
          placeholder="FutureGoal"
          className="form-control"
          ref={futureGoalRef}
          required
        ></textarea>
        <label htmlFor="currentAddress">Current Address</label>
        <br />
        <textarea
          id="currentAddress"
          placeholder="CurrentAddress"
          className="form-control"
          ref={currentAddressRef}
          required
        ></textarea>

        <button type="submit" className="btn btn-success">
          Submit
        </button>

        {success ? <div className="text-success">{success}</div> : null}
        {error ? <div className="text-danger">{error}</div> : null}
      </form>
    </>
  );
}

export default Registration;
