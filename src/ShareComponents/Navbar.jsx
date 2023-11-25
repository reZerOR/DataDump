import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const user = false;
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allsurvey"}>All Survey</NavLink>
      </li>
      <li>
        <NavLink to={"/pro"}>Become Pro</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/bidrequest"}>Bid Requests</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-project-400">
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
              <h2>{user.displayName}</h2>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {/* <img src={user.photoURL ? user.photoURL : profile} /> */}
                </div>
              </label>
              <a
                //   onClick={handleLogOut}
                className="bg-2  py-2 px-5 rounded-lg hover:bg-3 cursor-pointer"
              >
                SignOut
              </a>
            </>
          ) : (
            <>
              <NavLink
                className="bg-2 py-2 px-5 rounded-lg hover:bg-3 cursor-pointer"
                to={"/login"}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;