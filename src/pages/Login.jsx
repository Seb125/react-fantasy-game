import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        authService
            .login(requestBody)
            .then((response) => {
                setError("");
                storeToken(response.data.authToken);
                authenticateUser();                
            })
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setError(errorDescription);
            });
    };



    return (
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="pwd">Password</label>
                <input type="password" name="pwd" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
            <p>Not registered yet? <Link to="/register">Register here</Link></p>
        </div>
                     
    );
};

export default Login;