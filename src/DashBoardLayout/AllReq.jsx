import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { HiDotsVertical, HiOutlineAdjustments } from 'react-icons/hi';
import { AuthContext } from '../Authentication/AuthContext';

const AllReq = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const { mainProfileData } = useContext(AuthContext);
  console.log(mainProfileData);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/Recipients');
        setAllRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load all donation requests');
      }
    };

    fetchAllRequests();
  }, []);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredRequests(allRequests);
    } else {
      setFilteredRequests(allRequests.filter(req => req.donationStatus === filterStatus));
    }
    setCurrentPage(1);
  }, [filterStatus, allRequests]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AF3E3E',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/Recipients/${id}`);
        setAllRequests(prev => prev.filter(req => req._id !== id));
        Swal.fire('Deleted!', 'The request has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Could not delete request', 'error');
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/Recipients/${id}`, { donationStatus: newStatus });
      setAllRequests(prev =>
        prev.map(req => (req._id === id ? { ...req, donationStatus: newStatus } : req))
      );
      toast.success('Status Updated!');
    } catch (err) {
      toast.error('NOT UPDATED');
      console.error(err);
    }
  };

  const ActionsMenu = ({ req }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const handleClickOutside = () => setOpen(false);
      if (open) window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }, [open]);

    return (
      <div className="relative inline-block text-left">
        <button
          onClick={e => {
            e.stopPropagation();
            setOpen(prev => !prev);
          }}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Actions menu"
        >
          <HiDotsVertical size={20} />
        </button>
        {open && (
          <div
            onClick={e => e.stopPropagation()}
            className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
          >
            <button
              onClick={() => {
                navigate(`/dashboard/admin/view/${req._id}`);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              View
            </button>
            <button
              onClick={() => {
                navigate(`/dashboard/admin/edit/${req._id}`);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(req._id);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  const StatusMenu = ({ req }) => {
    const [open, setOpen] = useState(false);

    const statuses = ['pending', 'inprogress', 'done', 'canceled'];

    const availableStatuses = statuses.filter(
      status =>
        status !== req.donationStatus &&
        (req.donationStatus !== 'done' || status === req.donationStatus)
    );

    useEffect(() => {
      const handleClickOutside = () => setOpen(false);
      if (open) window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }, [open]);

    return (
      <div className="relative inline-block text-left ml-2">
        <button
          onClick={e => {
            e.stopPropagation();
            setOpen(prev => !prev);
          }}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Status menu"
        >
          <HiOutlineAdjustments size={20} />
        </button>
        {open && (
          <div
            onClick={e => e.stopPropagation()}
            className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
          >
            {availableStatuses.length === 0 ? (
              <div className="px-4 py-2 text-gray-400 select-none">No changes</div>
            ) : (
              availableStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => {
                    handleStatusUpdate(req._id, status);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left capitalize text-gray-700 hover:bg-gray-100"
                >
                  {status}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-[#EAEBD0] min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📋 All Donation Requests</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-md shadow-sm transition font-medium ${
              filterStatus === status
                ? 'bg-[#AF3E3E] text-white'
                : 'bg-white hover:bg-[#FFDCDC]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto text-sm md:text-base">
          <thead className="bg-[#DA6C6C] text-white">
            <tr>
              <th className="p-3">Requester</th>
              <th className="p-3">Recipient</th>
              <th className="p-3">Location</th>
              <th className="p-3">Hospital</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Date &amp; Time</th>
              <th className="p-3">Status</th>
              {/* Only show Actions header if Admin */}
              {mainProfileData?.role === 'Admin' && (
                <th className="p-3 text-center">Actions</th>
              )}
              <th className="p-3 text-center">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={mainProfileData?.role === 'Admin' ? 9 : 8} className="text-center py-6 text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              currentItems.map(req => (
                <tr key={req._id} className="hover:bg-[#FFF2EB] border-b">
                  <td className="p-3">{req.requesterName}</td>
                  <td className="p-3">{req.recipientName}</td>
                  <td className="p-3">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="p-3">{req.hospitalName}</td>
                  <td className="p-3 font-semibold text-[#AF3E3E]">{req.bloodGroup}</td>
                  <td className="p-3">
                    {req.donationDate} at {req.donationTime}
                  </td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        req.donationStatus === 'pending'
                          ? 'bg-yellow-500'
                          : req.donationStatus === 'inprogress'
                          ? 'bg-blue-500'
                          : req.donationStatus === 'done'
                          ? 'bg-green-600'
                          : 'bg-red-500'
                      }`}
                    >
                      {req.donationStatus}
                    </span>
                  </td>

                  
                  {mainProfileData?.role === 'Admin' && (
                    <td className="p-3 text-center">
                      <ActionsMenu req={req} />
                    </td>
                  )}

                  <td className="p-3 text-center">
                    <StatusMenu req={req} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-9 h-9 rounded-full text-sm font-medium ${
                currentPage === idx + 1
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

export default AllReq;
