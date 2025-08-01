import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { getIdToken } from 'firebase/auth';
import { AuthContext } from '../Authentication/AuthContext';
import { FaEllipsisV } from 'react-icons/fa';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const usersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://lifedrop-server-pi.vercel.app/AllUsers");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
    setLoading(false);
  };

  const updateUserRole = async (id, newRole) => {
    try {
      const token = await getIdToken(user);
      await axios.patch(
        `https://lifedrop-server-pi.vercel.app/AllUsers/role/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      const token = await getIdToken(user);
      await axios.patch(
        `https://lifedrop-server-pi.vercel.app/AllUsers/role/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`User status changed to ${newStatus}`);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to change status");
    }
  };

  const filteredUsers =
    statusFilter === 'all'
      ? users
      : users.filter((user) => user.status.toLowerCase() === statusFilter.toLowerCase());

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  const getRoleBadgeStyle = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'volunteer':
        return 'bg-blue-100 text-blue-700';
      case 'user':
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {/* Filter */}
      <div className="mb-4 space-x-2   ">
        {['all', 'Active', 'Blocked'].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 cursor-pointer  rounded ${
              statusFilter === status ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border bg-white border-gray-200 rounded-lg">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-[#DA6C6C] text-white">
              <tr>
                <th className="p-2">Avatar</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="p-2">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/tPqXK6g/avatar.png'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${getRoleBadgeStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-2 text-center relative">
                    {/* Block/Unblock button always visible */}
                    <button
                      onClick={() => toggleUserStatus(user._id, user.status)}
                      className={`px-3 py-1 mb-1 rounded text-white text-sm ${
                        user.status === 'Active'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {user.status === 'Active' ? 'Block' : 'Unblock'}
                    </button>

                    {/* Dropdown menu */}
                    <div className="inline-block ml-2 relative">
                      <button
                        onClick={() =>
                          setDropdownOpenId(dropdownOpenId === user._id ? null : user._id)
                        }
                        className="p-2 rounded hover:bg-gray-200"
                      >
                        <FaEllipsisV />
                      </button>

                      {dropdownOpenId === user._id && (
                        <div className="absolute right-0 z-10 bg-white border rounded shadow-md mt-2">
                          <ul className="text-sm w-40">
                            {user.role !== 'Admin' && (
                              <li
                                onClick={() => updateUserRole(user._id, 'Admin')}
                                className="px-4 py-2 hover:bg-[#cc99ff] cursor-pointer"
                              >
                                Make Admin
                              </li>
                            )}
                            {user.role !== 'Volunteer' && (
                              <li
                                onClick={() => updateUserRole(user._id, 'Volunteer')}
                                className="px-4 py-2 hover:bg-[#cc99ff] cursor-pointer"
                              >
                                Make Volunteer
                              </li>
                            )}
                            {user.role !== 'Donor' && (
                              <li
                                onClick={() => updateUserRole(user._id, 'Donor')}
                                className="px-4 py-2 hover:bg-[#cc99ff] cursor-pointer"
                              >
                                Make Donor
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
