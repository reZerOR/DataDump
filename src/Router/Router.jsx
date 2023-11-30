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
import AllSurveys from "../Pages/AllSurveys/AllSurveys";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import AddSurvey from "../Pages/AddSurvey/AddSurvey";
import SurveyorRoute from "./SurveyorRoute";
import UpdateSurvey from "../Pages/UpdateSurvey/UpdateSurvey";
import UpdateASurvey from "../Pages/UpdateASurvey/UpdateASurvey";
import SurveyorSurveyResult from "../Pages/SurveyorSurveyResults/SurveyorSurveyResult";
import SurveyManage from "../Pages/SurveyManage/SurveyManage";
import AdminSurveyResult from "../Pages/AdminsurveyResult/AdminSurveyResult";

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
      {
        path: "/allsurvey",
        element: <AllSurveys></AllSurveys>,
      },
      {
        path: "/surveyDetails/:id",
        element: <SurveyDetails></SurveyDetails>,
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
      // surveyeor page
      {
        path: "addSurvey",
        element: (
          <SurveyorRoute>
            <AddSurvey></AddSurvey>
          </SurveyorRoute>
        ),
      },
      {
        path: "updateSurvey",
        element: (
          <SurveyorRoute>
            <UpdateSurvey></UpdateSurvey>
          </SurveyorRoute>
        ),
      },
      {
        path: "UpdateASurvey/:id",
        element: (
          <SurveyorRoute>
            <UpdateASurvey></UpdateASurvey>
          </SurveyorRoute>
        ),
      },
      {
        path: "surveyResults",
        element: (
          <SurveyorRoute>
            <SurveyorSurveyResult></SurveyorSurveyResult>
          </SurveyorRoute>
        ),
      },
      {
        path: "surveymanage",
        element: (
          <AdminRoute>
            <SurveyManage></SurveyManage>
          </AdminRoute>
        ),
      },
      {
        path: "surveyadminresults",
        element: (
          <AdminRoute>
            <AdminSurveyResult></AdminSurveyResult>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
