import { Outlet } from "react-router";
import DonorSidebar from "../Donor/DonorSidebar";
import Topbar from "./Topbar";
import VolunteerSidebar from "../Volunteer/VolunteerSidebar";


const Volunteer = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <VolunteerSidebar></VolunteerSidebar>

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

export default Volunteer;
