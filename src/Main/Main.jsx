import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      this main page
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
