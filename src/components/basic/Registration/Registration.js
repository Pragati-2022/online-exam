import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "./../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../images/ring-36.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration({ isAuthenticated }) {
  const navigate = useNavigate();
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
  const cvRef = useRef(null);
  const contextValue = useContext(UserContext);

  useEffect(() => {
    contextValue.dispatch({ type: "GET_USER" });
  }, []);

  useEffect(() => {
    let addDetails = {
      step: "enter_details",
    };
    contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });

    axios.get(`${process.env.REACT_APP_API}/users/college/get`).then((res) => {
      setCollegeNames(res?.data);
    });
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
      !currentAddressRef.current.value ||
      !cvRef.current.value
    ) {
      toast.warning("Details are required!");
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
        rdoc: cvRef.current.files[0],
      };

      let formData = new FormData();

      formData.append("firstName", firstNameRef.current.value);
      formData.append("middleName", middleNameRef.current.value);
      formData.append("lastName", lastNameRef.current.value);
      formData.append("mobileNo", phoneRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("collegeName", collegeNameRef.current.value);
      formData.append("experience", experienceRef.current.value);
      formData.append("dob", dateOfBirthRef.current.value);
      formData.append("educationDetails", educationDetailsRef.current.value);
      formData.append("areaOfIntrest", areaOfInterestRef.current.value);
      formData.append("futureGoal", futureGoalRef.current.value);
      formData.append("currentAddress", currentAddressRef.current.value);
      formData.append("rdoc", cvRef.current.files[0], cvRef.current.files[0]);

      setIsLoad(true);
      axios
        .post(`${process.env.REACT_APP_API}/users/candidate/create`, formData)
        .then((res) => {
          console.log("create user", res);
          toast.success("Register successful!");
          localStorage.setItem("userEmail", emailRef.current.value);
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
            localStorage.setItem("userEmail", "complete");
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
          toast.error(error.response.data.message);
          console.error(error.response.data.message);
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

  const handleCvUpload = (e) => {
    console.log("file upload event", e.target.files[0]);
  };

  return (
    <>
      <main className="main-wrap pb-7">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3 className="card-header-title">Registration</h3>
            </div>
            <div className="card-body">
              <form className="registration-from" onSubmit={(e) => onSubmit(e)}>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="firstName"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        ref={firstNameRef}
                        required
                      />
                      <label htmlFor="firstName">First Name</label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="middleName"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        ref={middleNameRef}
                        required
                      />
                      <label htmlFor="middleName">Middle Name</label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="lastName"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        ref={lastNameRef}
                        required
                      />
                      <label htmlFor="LastName">Last Name</label>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <div className="floating-label">
                      <input
                        id="dateOfBirth"
                        placeholder=" "
                        type="date"
                        className="form-control"
                        max={`${new Date().getFullYear() - 18}-${
                          (new Date().getMonth() + 1).toString().length > 1
                            ? new Date().getMonth() + 1
                            : "0" + new Date().getMonth() + 1
                        }-${
                          new Date().getDate().toString().length > 1
                            ? new Date().getDate()
                            : "0" + new Date().getDate()
                        }`}
                        ref={dateOfBirthRef}
                        required
                      />
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-5">
                    <div className="floating-label">
                      <input
                        id="email"
                        placeholder=" "
                        type="email"
                        className="form-control"
                        ref={emailRef}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="floating-label">
                      <input
                        id="phone"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        onChange={(e) => handleOnChangePhone(e)}
                        ref={phoneRef}
                        minLength="10"
                        maxLength="10"
                        required
                      />
                      <label htmlFor="phone">Mobile Number</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <select
                        name="collegeName"
                        id="collegeName"
                        className="form-select"
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
                      <label htmlFor="collegeName">College Name</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <select
                        name="experience"
                        id="experience"
                        className="form-select"
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
                      <label htmlFor="experience">Experience</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <textarea
                        id="currentAddress"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={currentAddressRef}
                        required
                      ></textarea>
                      <label htmlFor="currentAddress">Current Address</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <textarea
                        id="educationDetails"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={educationDetailsRef}
                        required
                      ></textarea>
                      <label htmlFor="educationDetails">
                        Education Details : Last Semester Grade
                      </label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <textarea
                        id="areaOfInterest"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={areaOfInterestRef}
                        required
                      ></textarea>
                      <label htmlFor="areaOfInterest">Area of Interest</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <textarea
                        id="futureGoal"
                        placeholder=" "
                        className="form-control !h-[100px]"
                        ref={futureGoalRef}
                        required
                      ></textarea>
                      <label htmlFor="futureGoal">Future Goal</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <div className="floating-label">
                      <input
                        id="cv"
                        className="form-control !h-[100px]"
                        type="file"
                        ref={cvRef}
                        required
                      />
                      <label htmlFor="cv">Upload CV</label>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoad}
                    >
                      {!isLoad ? (
                        <>
                          <span className="btn-text">Submit</span>
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
                              />
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="btn-icon">
                            <img
                              width="12"
                              height="12"
                              src={Spinner}
                              alt="Spinner"
                            />
                          </span>
                          <span className="btn-text">Loading...</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Registration;
