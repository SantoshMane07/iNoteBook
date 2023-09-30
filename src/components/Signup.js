import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  // History or Navigate
  let navigate = useNavigate();

  //name email and password state
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  //Handle on Submit
  const handleSubmit = async (e) => {
    //Api call
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    //Check confirm password and password are same
    if (cpassword === password) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //redirect to home page valid user
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully", "success");
      } else {
        //Alert - f
        props.showAlert(json.error, "danger");
      }
    }else{
      props.showAlert("Confirm password and password does not match", "danger");
    }
  };

  // On text fields change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2 className="my-2">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            onChange={onChange}
            value={credentials.name}
            name="name"
            required
            minLength={1}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            onChange={onChange}
            value={credentials.email}
            name="email"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={credentials.password}
            name="password"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
