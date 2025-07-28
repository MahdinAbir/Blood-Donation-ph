import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import { AuthContext } from '../Authentication/AuthContext';
import { getIdToken } from 'firebase/auth';

const BloodReq = () => {
    const { user } = useContext(AuthContext);
    const [allRequests, setAllRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = await getIdToken(user);
                const res = await axios.get(
                    `http://localhost:3000/Recipients/email/${user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAllRequests(res.data);

            } catch (err) {
                console.error(err);
                toast.error('Failed to load donation requests');
            }
        };

        if (user?.email) fetchRequests();
    }, [user]);

    useEffect(() => {
        if (filterStatus === 'all') {
            setFilteredRequests(allRequests);
        } else {
            setFilteredRequests(allRequests.filter(req => req.donationStatus === filterStatus));
        }
        setCurrentPage(1); // Reset to first page when filtering
    }, [filterStatus, allRequests]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-4 md:p-6 bg-[#EAEBD0] min-h-screen">
            <h2 className="text-2xl font-bold mb-4">🩸 My Donation Requests</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
                {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-1.5 rounded-md shadow-sm transition font-medium ${filterStatus === status
                                ? 'bg-[#AF3E3E] text-white'
                                : 'bg-white hover:bg-[#FFDCDC]'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="w-full table-auto text-sm md:text-base">
                    <thead className="bg-[#DA6C6C] text-white">
                        <tr>
                            <th className="p-3">Recipient</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Hospital</th>
                            <th className="p-3">Blood Group</th>
                            <th className="p-3">Date & Time</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No donation requests found.
                                </td>
                            </tr>
                        ) : (
                            currentItems.map(req => (
                                <tr key={req._id} className="hover:bg-[#FFF2EB] border-b">
                                    <td className="p-3">{req.recipientName}</td>
                                    <td className="p-3">{req.recipientDistrict}, {req.recipientUpazila}</td>
                                    <td className="p-3">{req.hospitalName}</td>
                                    <td className="p-3 font-semibold text-[#AF3E3E]">{req.bloodGroup}</td>
                                    <td className="p-3">
                                        {req.donationDate} at {req.donationTime}
                                    </td>
                                    <td className="p-3 capitalize">
                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${req.donationStatus === 'pending' ? 'bg-yellow-500' :
                                                req.donationStatus === 'inprogress' ? 'bg-blue-500' :
                                                    req.donationStatus === 'done' ? 'bg-green-600' :
                                                        'bg-red-500'
                                            }`}>
                                            {req.donationStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`w-9 h-9 rounded-full text-sm font-medium ${currentPage === idx + 1
                                    ? 'bg-[#AF3E3E] text-white'
                                    : 'bg-white hover:bg-[#FFDCDC]'
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BloodReq;
