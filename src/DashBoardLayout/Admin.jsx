import { Outlet } from "react-router";
import DonorSidebar from "../Donor/DonorSidebar";
import Topbar from "./Topbar";


const Admin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DonorSidebar></DonorSidebar>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
       <Topbar></Topbar>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#EAEBD0]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
