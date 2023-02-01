import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { GymProvider } from "./context";
import { ToastContainer, toast } from "react-toastify";
import { AuthDetail } from "./context/auth.index";

require("react-web-vector-icons/fonts");

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <GymProvider>
      <AuthDetail>
        <App />
        <ToastContainer />
      </AuthDetail>
    </GymProvider>
  </React.StrictMode>,
  rootElement
);

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

reportWebVitals();
