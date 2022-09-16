import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { GymProvider } from "./context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <GymProvider>
      <App />
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
