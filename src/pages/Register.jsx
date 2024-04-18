import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const hasValidPassword = (str) => {
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      return passwordRegex.test(str);
    };

    if (!hasValidPassword(password)) {
      setError(
        "Password must be at least 6 characters long, contain one special character, one uppercase letter, one lowercase letter and one digit"
      );
      return;
    }

    const requestBody = { email, password, name };

    authService
      .register(requestBody)
      .then(() => {
        setError("");
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(errorDescription)
        setError(errorDescription);
      });
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="pwd">Password</label>
        <input
          type="password"
          name="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
