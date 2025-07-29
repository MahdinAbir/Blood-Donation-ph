import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../Authentication/AuthContext';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const { mainProfileData } = useContext(AuthContext);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/Recipients');
        const pending = res.data.filter((req) => req.donationStatus === 'pending');
        setRequests(pending);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const getRoleRoute = (id) => {
    if (!mainProfileData?.role) return `/auth/login`; // fallback if not logged in

    const role = mainProfileData.role.toLowerCase();
    return `/dashboard/${role}/view/${id}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#AF3E3E]">Pending Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-[#CD5656] mb-2">{req.recipientName}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Blood Group:</strong> {req.bloodGroup}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {req.donationDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {req.donationTime}
                </p>
              </div>
              <div className="mt-4 text-right">
                <Link
                  to={getRoleRoute(req._id)}
                  className="inline-block px-4 py-2 bg-[#DA6C6C] text-white text-sm rounded hover:bg-[#CD5656] transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
