import React, { useState } from 'react';
import "./Login.scss";
import newRequest from '../../../utils/newRequest';
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await newRequest.post("auth/login",{username,password})
     localStorage.setItem("currentUser",JSON.stringify(res.data))
     navigate("/")
      console.log(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {err && err}
      </form>
    </div>
  );
};

export default Login;
