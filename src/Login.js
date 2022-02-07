import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "./App";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const info = await response.json();

    if (info.error) {
      setUsername("");
      setPassword("");
      return setError(info.error.message);
    }
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);
    setUsername("");
    setPassword("");
    history.push("/posts");
  };

  return (
    <div id="login">
      <form id="Login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>

        <label>Password</label>
        <input
          type="text"
          value={password}
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Login;
