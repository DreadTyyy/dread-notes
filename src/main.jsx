import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import NoteApp from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteApp />
    </BrowserRouter>
  </React.StrictMode>
);
