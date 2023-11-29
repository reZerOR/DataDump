import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../ShareComponents/Navbar";
import Footer from "../ShareComponents/Footer";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>

      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
