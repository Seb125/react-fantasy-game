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
                return null;            
            })
            .then((response) => {
                console.log("gg")
                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setError(errorDescription);
            });
    };



    return (
        <div style={{height: "100vh"}}>
        <div className="form-container">
            <form onSubmit={handleLogin} className="form">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} placeholder="sebastian.schwarz@gito-verlag.de" onChange={(e) => setEmail(e.target.value)} className="form-element"></input>
                <label htmlFor="pwd">Password</label>
                <input type="password" name="pwd" value={password} placeholder="123456Aa" onChange={(e) => setPassword(e.target.value)} className="form-element"></input>
                <button type="submit" className="form-element">Login</button>
            <p>Not registered yet? <Link to="/register">Register here</Link></p>
            </form>
            </div>
        </div>
                     
    );
};

export default Login;