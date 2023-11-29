import { NavLink } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Headroom from "react-headroom";
import useProUser from "../hooks/useProUser";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [proUser] = useProUser();
  const [isAdmin] = useAdmin();
  console.log(proUser, loading, isAdmin);

  const handleLogOut = () => {
    logOut().then().catch();
  };
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allsurvey"}>All Survey</NavLink>
      </li>
      {!proUser && user && !isAdmin && (
        <li>
          <NavLink to={"/pro"}>Become Pro</NavLink>
        </li>
      )}
      {isAdmin && user && (
        <li>
          <NavLink to={"/dashboard/manageUsers"}>Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to={"/bidrequest"}>Bid Requests</NavLink>
      </li>
    </>
  );
  return (
    <Headroom>
      <div className="bg-project-400 w-full">
        <div className="navbar max-w-7xl bg-project-400 mx-auto bg-1">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu gap-2 menu-sm dropdown-content bg-project-400 mt-3 z-[1] p-2 shadow font-bold text-2xl bg-2 rounded-box w-52"
              >
                {links}
              </ul>
            </div>
            <a className="btn flex items-center justify-center btn-ghost normal-case text-xl">
              {/* <img className="w-10" src={logo} alt="" /> */}
              <span>DataDump</span>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu gap-2 menu-horizontal font-bold  px-1">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <p className="mr-2 gap-1 flex justify-center items-center">
                  {user?.displayName}{" "}
                  {proUser && (
                    <span className="text-xs bg-project-900 text-white px-1 rounded-full">
                      pro
                    </span>
                  )}
                  {isAdmin && (
                    <span className="text-xs bg-project-900 text-white px-1 rounded-full">
                      admin
                    </span>
                  )}
                </p>
                <a
                  onClick={handleLogOut}
                  className="  py-2 px-5 bg-project-500 hover:bg-project-300 rounded-lg cursor-pointer"
                >
                  SignOut
                </a>
              </>
            ) : (
              <>
                <NavLink
                  className="bg-project-300 py-2 px-5 rounded-lg hover:bg-project-500 cursor-pointer"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
