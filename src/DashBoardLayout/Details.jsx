import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { AuthContext } from "../Authentication/AuthContext";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`https://lifedrop-server-pi.vercel.app/Recipients/${id}`, { donationStatus: newStatus });
      toast.success("Status Updated!");
    } catch (err) {
      toast.error("NOT UPDATED");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchDonor = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getIdToken(user);
        const res = await axios.get(`https://lifedrop-server-pi.vercel.app/Recipients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonor(res.data);
      } catch (err) {
        setError("Failed to load donor data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [user, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading donor details...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!donor)
    return (
      <div className="text-center mt-10 text-gray-500 font-semibold">
        No donor data found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-3xl font-semibold mb-6 text-[#AF3E3E]">
        Donation Request Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem label="Requester Name" value={donor.requesterName} />
        <InfoItem label="Requester Email" value={donor.requesterEmail} />
        <InfoItem label="Recipient Name" value={donor.recipientName} />
        <InfoItem
          label="Recipient Location"
          value={`${donor.recipientDistrict}, ${donor.recipientUpazila}`}
        />
        <InfoItem label="Hospital" value={donor.hospitalName} />
        <InfoItem label="Full Address" value={donor.fullAddress} />
        <InfoItem
          label="Blood Group"
          value={donor.bloodGroup}
          valueClassName="text-red-600 font-bold text-lg"
        />
        <InfoItem label="Donation Date" value={donor.donationDate} />
        <InfoItem label="Donation Time" value={donor.donationTime} />
        <InfoItem label="Request Message" value={donor.requestMessage} />
        <InfoItem
          label="Donation Status"
          value={donor.donationStatus}
          valueClassName={`capitalize font-semibold px-3 py-1 rounded-full text-white ${
            donor.donationStatus === "pending"
              ? "bg-yellow-500"
              : donor.donationStatus === "inprogress"
              ? "bg-blue-500"
              : donor.donationStatus === "done"
              ? "bg-green-600"
              : "bg-gray-500"
          }`}
        />
        <InfoItem
          label="Created At"
          value={new Date(donor.createdAt).toLocaleString()}
        />
      </div>

      {donor.donationStatus === "pending" && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-[#AF3E3E] text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Donate
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-[#AF3E3E]">
              Confirm Donation
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Donor Name</label>
                <input
                  type="text"
                  value={user.displayName || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-600">Donor Email</label>
                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleStatusUpdate(donor._id, "inprogress");
                  setDonor({ ...donor, donationStatus: "inprogress" });
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-[#AF3E3E] text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value, valueClassName = "" }) => (
  <div className="bg-[#f9f9f9] rounded-md p-4 shadow hover:shadow-md transition-shadow duration-200 cursor-default">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`text-gray-800 ${valueClassName}`}>{value}</p>
  </div>
);

export default Details;
