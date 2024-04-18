import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { LevelProviderWrapper } from "./context/level.context.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <LevelProviderWrapper>
          <App />
        </LevelProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
