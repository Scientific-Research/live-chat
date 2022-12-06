import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
// import "./index.css";
import "./main.scss";
import store from "./store/index.js";

// import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import alertTemplate from "react-alert-template-basic";

// const options = {
//   timeout: 5000,
//   positions: positions.BOTTOM_CENTER,
//   transitions: transitions.SCALE,
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
