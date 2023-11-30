import { NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSurveyor] = useSurveyor();
  const adminSidenav = (
    <>
      <li>
        <NavLink to={"manageUsers"}>Manage Users</NavLink>
      </li>
      <li>
        <NavLink to={"allpayments"}>All Payments</NavLink>
      </li>
      <li>
        <NavLink to={"surveymanage"}>Survey Manage</NavLink>
      </li>
      <li>
        <NavLink to={"surveyadminresults"}>Survey Results</NavLink>
      </li>
    </>
  );
  const surveyornav = (
    <>
      <li>
        <NavLink to={"addSurvey"}>Add Survey</NavLink>
      </li>
      <li>
        <NavLink to={"UpdateSurvey"}>Feedbacks and Update</NavLink>
      </li>
      <li>
        <NavLink to={"surveyResults"}>Survey Responses</NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="text-4xl p-3 flex justify-start items-center gap-3 bg-project-500  cursor-pointer w-full lg:hidden"
        >
          <GiHamburgerMenu /> <p className="text-3xl font-bold">DataDump</p>
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-64 min-h-full bg-project-500 text-base-content">
          {/* Sidebar content here */}
          <p className="text-3xl text-center mb-5 font-bold">DataDump</p>
          {isAdmin ? adminSidenav : isSurveyor && surveyornav}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
