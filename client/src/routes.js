import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Home from "./Pages/Home.js";
import CheckAuth from "./utils/CheckAuth.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Guest from "./utils/Guest.js";
//import Cookies from "js-cookie";

// const token = Cookies.get("token");

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
        // element: ,
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
    ],
  },
]);
