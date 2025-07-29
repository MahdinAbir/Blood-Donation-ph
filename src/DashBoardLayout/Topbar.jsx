import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";

const Topbar = () => {
  const { mainProfileData } = useContext(AuthContext);

  return (
    <header className="bg-[#FAD0C4] px-6 py-10 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold text-[#AF3E3E]">
        👋 Welcome, <span className="font-bold">{mainProfileData?.name || 'Donor'}</span>
      </h1>
      
      <div className="flex items-center gap-4"></div>
    </header>
  );
};

export default Topbar;
