import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "./../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../images/ring-36.svg";

function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [collegeNames, setCollegeNames] = useState([]);

  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const collegeNameRef = useRef(null);
  const experienceRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const educationDetailsRef = useRef(null);
  const areaOfInterestRef = useRef(null);
  const futureGoalRef = useRef(null);
  const currentAddressRef = useRef(null);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    } else if (
      contextValue.newUser?.testStatus?.toLowerCase() === "complete" ||
      contextValue.newUser?.step?.toLowerCase() === "final"
    ) {
      navigate("/result");
    } else if (!contextValue.newUser?.step) {
      let addDetails = {
        step: "enter_details",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });

      axios
        .get(`${process.env.REACT_APP_API}/users/college/get`)
        .then((res) => {
          setCollegeNames(res?.data);
        });
    } else if (contextValue.newUser?.step === "start_test") {
      navigate("/start_test");
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !firstNameRef.current.value ||
      !middleNameRef.current.value ||
      !lastNameRef.current.value ||
      !emailRef.current.value ||
      !phoneRef.current.value ||
      !collegeNameRef.current.value ||
      !experienceRef.current.value ||
      !dateOfBirthRef.current.value ||
      !educationDetailsRef.current.value ||
      !areaOfInterestRef.current.value ||
      !futureGoalRef.current.value ||
      !currentAddressRef.current.value
    ) {
      setSuccess("");
      setError("Details are required!");
    } else {
      const userDetail = {
        firstName: firstNameRef.current.value,
        middleName: middleNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        mobileNo: phoneRef.current.value,
        collegeName: collegeNameRef.current.value,
        experience: experienceRef.current.value,
        dob: dateOfBirthRef.current.value,
        educationDetails: educationDetailsRef.current.value,
        areaOfIntrest: areaOfInterestRef.current.value,
        futureGoal: futureGoalRef.current.value,
        currentAddress: currentAddressRef.current.value,
        // collegeName : 'JECRC'
      };

      setIsLoad(true);
      axios
        .post(`${process.env.REACT_APP_API}/users/candidate/create`, userDetail)
        .then((res) => {
          console.log("create user", res);
          setSuccess("Register successful");
          setError("");
          if (
            experienceRef.current.value === "0" ||
            experienceRef.current.value === "1-2"
          ) {
            const addDetails = {
              email: emailRef.current.value,
              candidateId: res.data?.candidateid,
            };
            contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
            navigate(`/start_test`);
          } else {
            const addDetails = {
              step: "final",
              email: emailRef.current.value,
            };
            contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
            navigate(`/result`);
          }
          setIsLoad(false);
        })
        .catch((error) => {
          setSuccess("");
          setError(error.response.data.message);
          alert(error.response.data.message);
          setIsLoad(false);
          return false;
        });
    }
  };

  const handleOnChangePhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      phoneRef.current.value = e.target.value;
    } else {
      phoneRef.current.value = "";
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
              <label htmlFor="email">Email Address</label>
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
              <label htmlFor="phone">Mobile No.</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <input
                    id="phone"
                    placeholder="Mobile No"
                    type="text"
                    className="form-control"
                    onChange={(e) => handleOnChangePhone(e)}
                    ref={phoneRef}
                    minLength="10"
                    maxLength="10"
                    required
                  />
                </div>
              </div>
            </div>{" "}
            <div className="form-group">
              <label htmlFor="collegeName">College Name</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <select
                    name="collegeName"
                    id="collegeName"
                    className="form-control"
                    ref={collegeNameRef}
                    required
                  >
                    <option value="">Select College Name</option>
                    {collegeNames.map((obj, index) => (
                      <option key={index} value={obj.collegeName}>
                        {obj.collegeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <div className="form-group-inner">
                <div className="cmn-form-control">
                  <select
                    name="experience"
                    id="experience"
                    className="form-control"
                    ref={experienceRef}
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="0">0</option>
                    <option value="1-2">1-2</option>
                    <option value="3-4">3-4</option>
                    <option value="5-6">5-6</option>
                    <option value="7-8">7-8</option>
                    <option value="9-10">9-10</option>
                    <option value="10+">10+</option>
                  </select>
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
              <button
                type="submit"
                className="cmn-btn submit-btn"
                disabled={isLoad}
              >
                {!isLoad ? (
                  <span>Submit</span>
                ) : (
                  <span>
                    <img src={Spinner} alt="Spinner" />
                    Loading...
                  </span>
                )}
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
