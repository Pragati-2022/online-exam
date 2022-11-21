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
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const educationDetailsRef = useRef(null);
  const areaOfInterestRef = useRef(null);
  const futureGoalRef = useRef(null);
  const currentAddressRef = useRef(null);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    }

    if (contextValue.newUser?.details) {
      firstNameRef.current.value =
        contextValue.newUser?.details.fullName.firstName;
      middleNameRef.current.value =
        contextValue.newUser?.details.fullName.middleName;
      lastNameRef.current.value =
        contextValue.newUser?.details.fullName.lastName;
      emailRef.current.value = contextValue.newUser?.details.email;
      dateOfBirthRef.current.value = contextValue.newUser?.details.dateOfBirth;
      educationDetailsRef.current.value =
        contextValue.newUser?.details.educationDetails;
      areaOfInterestRef.current.value =
        contextValue.newUser?.details.areaOfInterest;
      futureGoalRef.current.value = contextValue.newUser?.details.futureGoal;
      currentAddressRef.current.value =
        contextValue.newUser?.details.currentAddress;
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
      !lastNameRef.current.value ||
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

      navigate(`/star_test`);

      let userDetail = {
        fullName: {
          firstName: firstNameRef.current.value,
          middleName: middleNameRef.current.value,
          lastName: lastNameRef.current.value,
        },
        email: emailRef.current.value,
        dateOfBirth: dateOfBirthRef.current.value,
        educationDetails: educationDetailsRef.current.value,
        areaOfInterest: areaOfInterestRef.current.value,
        futureGoal: futureGoalRef.current.value,
        currentAddress: currentAddressRef.current.value,
      };

      let addDetails = {
        email: emailRef.current.value,
        details: userDetail,
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }
  };

  return (
    <>
      <div className="registration-from-main">
        <h2>Registration</h2>
        <form className="registration-from" onSubmit={(e) => onSubmit(e)}>
          <div className="rgstr-from-group">
            <div className="form-group form-group3">
              <label htmlFor="firstName">Full Name</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  {/* <span className="form-tagname">Firstname</span> */}
                  <input
                    id="firstName"
                    placeholder="FirstName"
                    type="text"
                    className="form-control"
                    ref={firstNameRef}
                    required
                  />
                </div>
                <div className="cmn-form-control">
                  {/* <span className="form-tagname">Middlename</span> */}
                  <input
                    id="middleName"
                    placeholder="MiddleName"
                    type="text"
                    className="form-control"
                    ref={middleNameRef}
                    required
                  />
                </div>
                <div className="cmn-form-control">
                  {/* <span className="form-tagname">Lastname</span> */}
                  <input
                    id="lastName"
                    placeholder="LastName"
                    type="text"
                    className="form-control"
                    ref={lastNameRef}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  {/* <span className="form-tagname">Date</span> */}
                  <input
                    id="dateOfBirth"
                    placeholder="DateOfBirth"
                    type="date"
                    className="form-control"
                    max={`${new Date().getFullYear() - 18}-${
                      new Date().getMonth() + 1
                    }-${new Date().getDate()}`}
                    ref={dateOfBirthRef}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="">Email Address</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    className="form-control"
                    ref={emailRef}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="currentAddress">Current Address</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <textarea
                    id="currentAddress"
                    placeholder="CurrentAddress"
                    className="form-control"
                    ref={currentAddressRef}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="educationDetails">
                Education Details : Last Semester Grade
              </label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <textarea
                    id="educationDetails"
                    placeholder="EducationDetails"
                    className="form-control"
                    ref={educationDetailsRef}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="areaOfInterest">Area of Interest</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <textarea
                    id="areaOfInterest"
                    placeholder="AreaOfInterest"
                    className="form-control"
                    ref={areaOfInterestRef}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="futureGoal">Future Goal</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <textarea
                    id="futureGoal"
                    placeholder="FutureGoal"
                    className="form-control"
                    ref={futureGoalRef}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="cmn-btn submit-btn">
                Submit
              </button>
            </div>
          </div>
          {success ? <div className="text-success">{success}</div> : null}
          {error ? <div className="text-danger">{error}</div> : null}
        </form>
      </div>
    </>
  );
}

export default Registration;
