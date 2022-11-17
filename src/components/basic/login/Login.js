import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef } from "react";

function Login() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Logged In !!");
    if (!emailRef.current.value || !passRef.current.value) {
      setSuccess("");
      setError("UserName and password is required!");
    } else {
      setSuccess("Login successful");
      setError("");

      let userDetail = {
        email: emailRef.current.value,
        pass: passRef.current.value
      };

      console.log(userDetail);
    }
  };

  return (
    <>
      <h1> Login </h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          placeholder="Email"
          type="email"
          className="form-control"
          ref={emailRef}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          className="form-control"
          ref={passRef}
        />

        <button type="submit" className="btn btn-success">
          Login
        </button>

        {success ? <div className="text-success">{success}</div> : null}
        {error ? <div className="text-danger">{error}</div> : null}
      </form>
    </>
  );
}

export default Login;
