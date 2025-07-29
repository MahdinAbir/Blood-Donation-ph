import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaUserFriends, FaHandHoldingUsd, FaTint } from 'react-icons/fa';
import axios from 'axios';

const DashboardStats = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  // Fetch Donors
  useEffect(() => {
    axios.get('http://localhost:3000/AllUsers') // replace with your endpoint
      .then(res => setTotalUsers(res.data.length))
      .catch(err => console.error(err));
  }, []);

  // Fetch Requests
  useEffect(() => {
    axios.get('http://localhost:3000/Recipients') // replace with your endpoint
      .then(res => setTotalRequests(res.data.length))
      .catch(err => console.error(err));
  }, []);
console.log(totalUsers, totalRequests)
  const stats = [
    {
      title: 'Total Donors',
      count: totalUsers,
      icon: <FaUserFriends className="text-4xl text-white" />,
      bg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    },
    {
      title: 'Total Funding',
      count: 32500, // hardcoded
      icon: <FaHandHoldingUsd className="text-4xl text-white" />,
      bg: 'bg-gradient-to-r from-green-400 to-emerald-600',
    },
    {
      title: 'Blood Requests',
      count: totalRequests,
      icon: <FaTint className="text-4xl text-white" />,
      bg: 'bg-gradient-to-r from-red-500 to-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {stats.map((item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bg}`}>
            {item.icon}
          </div>
          <div className="text-right">
            <h4 className="text-xl font-bold text-gray-800">
              <CountUp end={item.count} duration={2} separator="," />
            </h4>
            <p className="text-sm text-gray-500">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
