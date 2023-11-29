import { NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
  const adminSidenav = (
    <>
      <li>
        <NavLink to={"admin"}>Admin Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"manageUsers"}>Manage Users</NavLink>
      </li>
      <li>
        <NavLink to={"allpayments"}>All Payments</NavLink>
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
          {adminSidenav}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;