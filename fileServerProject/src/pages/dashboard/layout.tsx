import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-[#D8D8D8] flex h-screen w-full">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
