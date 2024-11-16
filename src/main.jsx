import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "../src/context/darkModeContext.jsx";
import "./main.scss";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <div className="app-container">
        <App />
      </div>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
