import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { AuthContext } from "../Authentication/AuthContext";
import { useParams } from "react-router";

const DonorDetails = () => {
    const {id}= useParams();
  const { user } = useContext(AuthContext);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id)

  useEffect(() => {
    if (!user) return;

    const fetchDonor = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getIdToken(user);
        const res = await axios.get(`http://localhost:3000/Recipients/${id}`, {
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
    </div>
  );
};

const InfoItem = ({ label, value, valueClassName = "" }) => (
  <div className="bg-[#f9f9f9] rounded-md p-4 shadow hover:shadow-md transition-shadow duration-200 cursor-default">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`text-gray-800 ${valueClassName}`}>{value}</p>
  </div>
);

export default DonorDetails;
