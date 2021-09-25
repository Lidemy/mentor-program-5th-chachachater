import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    background: `#EEF0F2`,
    border: `#141414`,
    font: `#011638`,
    first_button: `#EEC643`,
    second_button: `#0D21A1`,
    button_font: `#EEF0F2`,
  },
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
