
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

function Login(props) {
    // History or Navigate
    let navigate = useNavigate();
    //email and password state
    const [credentials, setCredentials] = useState({email:"",password:""});

  //Handle on Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //redirect to home page valid user
        localStorage.setItem('token',json.authtoken)
        navigate("/");
        props.showAlert("Logged in successfully","success");
    }else{
        //to be changed later 
        props.showAlert(json.error,"danger");
    }
  };

  // On text fields change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3">
      <h2 className="my-2">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit} className="m-13">
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
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
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
