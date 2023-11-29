import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Pro from "../Pages/BecomePro/Pro";
import ProUserRoute from "./ProUserRoute";
import Dashboard from "../Dashboard/Dashboard";
import ManageUsers from "../Pages/MangeUsers/ManageUsers";
import AllPayments from "../Pages/AllPayments/AllPayments";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

// All routes are here
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/pro",
        element: (
          <ProUserRoute>
            <Pro></Pro>
          </ProUserRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allpayments",
        element: (
          <AdminRoute>
            <AllPayments></AllPayments>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
