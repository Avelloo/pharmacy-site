import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Router } from "react-router-dom";
import history from "./history";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
    <Router history={history}>
      <Provider store={store}>
        
          <App />
        
      </Provider>
    </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
