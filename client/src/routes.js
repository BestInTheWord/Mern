import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Home from "./Pages/Home.js";
import CheckAuth from "./utils/CheckAuth.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Guest from "./utils/Guest.js";
import Category from "./Pages/Category.js"

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
      {
        path: "/category",
        element: (
          <CheckAuth>
           <Category />
         </CheckAuth>
        ),
      },
    ],
  },
]);
