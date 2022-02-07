import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_URL } from "./App";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("confirm password does not match original password");
      return;
    }
    //Submits register to server
    const resp = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const info = await resp.json();
    console.log(info);

    if (info.error) {
      return setError(info.error.message);
    }
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);
    history.push("/");
  };

  return (
    <>
      <form id="register" onSubmit={handleRegister}>
        <h1 id="register-header">Register</h1>
        <div>
          <input
            id="register"
            minLength={8}
            required
            placeholder="Enter username.."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="register"
            minLength={8}
            required
            placeholder="Enter password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            id="register"
            minLength={8}
            required
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <button id="register-button">Register</button>
      </form>
      <p>{error}</p>
    </>
  );
};
export default Register;
