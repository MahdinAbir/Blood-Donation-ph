import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Authentication/AuthContext";

import { getIdToken } from "firebase/auth";
import axios from "axios";
import Loader from "./Loader";

const DashboardRedirect = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roleLoading, setRoleLoading] = useState(true);
  console.log(user)

 useEffect(() => {
  const fetchRole = async () => {
    if (!loading && user?.email) {
      try {
        const token = await getIdToken(user);

        const res = await axios.get(
          `http://localhost:3000/Allusers/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const role = res.data[0].role;
        console.log(role)
console.log(role);
        if (role === "Admin") {
          navigate("/dashboard/admin");
        } else if (role === "Volunteer") {
          navigate("/dashboard/Volunteer");
        } else if (role === "Donor") {
          navigate("/dashboard/donor");
        } else {
          
          navigate("/unauthorized"); 
        }

      } catch (err) {
        console.error("Error verifying user or fetching role:", err);
        navigate("/unauthorized"); 
      } finally {
        setRoleLoading(false);
      }
    }
  };

  fetchRole();
}, [user, loading, navigate]);


  if (loading || roleLoading) return <Loader></Loader>;
  return null;
};

export default DashboardRedirect;
