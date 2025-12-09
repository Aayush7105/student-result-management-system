import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div style={{ fontFamily: "Inter, Arial, sans-serif" }}>
      <App />
    </div>
  </React.StrictMode>
);
