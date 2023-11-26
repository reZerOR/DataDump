import { Outlet } from "react-router-dom";
import Navbar from "../ShareComponents/Navbar";
import Footer from "../ShareComponents/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
