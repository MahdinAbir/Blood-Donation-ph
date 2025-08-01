import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";
import Loader from "../Components/Loader";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getIdToken } from "firebase/auth";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonationRequests = async () => {
    try {
      setLoading(true);
      if (!user) return; // safety check
      const token = await getIdToken(user, true); // force token refresh

      const res = await axios.get(`http://localhost:3000/Recipients/email/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(sorted.slice(0, 3));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch donation requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDonationRequests();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user) return;
    const token = await getIdToken(user, true); 
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#AF3E3E",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/Recipients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDonationRequests();
        Swal.fire("Deleted!", "The request has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not delete request", "error");
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (!user) return;
    try {
      const token = await getIdToken(user, true); // force refresh token
      await axios.patch(`http://localhost:3000/Recipients/${id}`, 
        { donationStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDonationRequests();
      toast.success("Status Updated!");
    } catch (err) {
      toast.error("NOT UPDATED");
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      {requests.length > 0 && (
        <>
          <h2 className="text-3xl mt-10 font-bold mb-6 text-[#AF3E3E]">Your Recent Donation Requests</h2>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white  ">
              <thead className="bg-[#DA6C6C] text-white  ">
                <tr>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Recipient</th>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Location</th>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Date</th>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Time</th>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Blood</th>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Status</th>
                  <th className="px-6 py-3 text-left text-xl font-bold ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-b ">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-[#e6e6ff] transition duration-150  ">
                    <td className="px-6 py-4 whitespace-nowrap ">{req.recipientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.donationDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.donationTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">{req.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize text-sm font-medium">
                      <span className={`px-2 py-1 rounded-full text-white ${
                        req.donationStatus === "pending" ? "bg-yellow-500" :
                        req.donationStatus === "inprogress" ? "bg-blue-500" :
                        req.donationStatus === "done" ? "bg-green-600" : "bg-gray-500"
                      }`}>
                        {req.donationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <Link to={`/dashboard/Admin/view/${req._id}`} className="bg-[#cc66ff] hover:bg-blue-400 text-white text-xs px-3 py-1 rounded-md">View</Link>
                      <Link to={`/dashboard/Admin/edit/${req._id}`} className="bg-green-400 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-md">Edit</Link>
                      <button onClick={() => handleDelete(req._id)} className="bg-red-500 hover:bg-red-700 cursor-pointer text-white text-xs px-3 py-1 rounded-md">Delete</button>
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button onClick={() => handleStatusUpdate(req._id, "done")} className="bg-[#33ccff] hover:bg-[#006699] text-white text-xs px-2 py-1 cursor-pointer rounded">Done</button>
                          <button onClick={() => handleStatusUpdate(req._id, "canceled")} className="bg-[#663300] cursor-pointer hover:bg-[#990033] text-white text-xs px-2 py-1 rounded">Cancel</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
