import React, { useContext, useEffect, useState } from 'react';
import districts from '../assets/districts.json';
import upazilas from '../assets/upazilas.json';
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthContext';

import { toast } from 'react-toastify';

import { getIdToken } from 'firebase/auth';
import Loader from '../Components/Loader';

const Profile = () => {
    const { user, setMainProfileData } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    // Profile data state
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        photoURL: '',
        bloodGroup: '',
        districtId: '',
        districtName: '',
        upazilaId: '',
        upazilaName: '',
    });

    // Filtered upazilas for dropdown
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    // Fetch profile on mount
    useEffect(() => {
        if (!user?.email) return;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const token = await getIdToken(user);

                const res = await axios.get(`http://localhost:3000/Allusers/${user.email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = res.data[0];

                // Find district id by matching name in districts json
                const districtObj = districts[2].data.find(d => d.name === data.district) || { id: '' };
                // Find upazila id by matching name and district id
                const upazilaObj = upazilas[2].data.find(u => u.name === data.upazila && u.district_id === districtObj.id) || { id: '' };

                // Set filtered upazilas for the district
                const filtered = upazilas[2].data.filter(u => u.district_id === districtObj.id);

                setProfileData({
                    name: data.name || '',
                    email: data.email || '',
                    photoURL: data.photoURL || '',
                    bloodGroup: data.bloodGroup || '',
                    districtId: districtObj.id,
                    districtName: districtObj.name || '',
                    upazilaId: upazilaObj.id,
                    upazilaName: upazilaObj.name || '',
                });
                setFilteredUpazilas(filtered);
            } catch (err) {
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    // Handle district change - update filtered upazilas and district name/id
    const handleDistrictChange = e => {
        const id = e.target.value;
        const districtObj = districts[2].data.find(d => d.id === id) || { name: '' };
        setProfileData(prev => ({
            ...prev,
            districtId: id,
            districtName: districtObj.name,
            upazilaId: '',
            upazilaName: '',
        }));
        const filtered = upazilas[2].data.filter(u => u.district_id === id);
        setFilteredUpazilas(filtered);
    };

    // Handle upazila change
    const handleUpazilaChange = e => {
        const id = e.target.value;
        const upazilaObj = filteredUpazilas.find(u => u.id === id) || { name: '' };
        setProfileData(prev => ({
            ...prev,
            upazilaId: id,
            upazilaName: upazilaObj.name,
        }));
    };

    // Handle input change (for text inputs)
    const handleInputChange = e => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save updated profile
    const handleSave = async e => {
        e.preventDefault();

        // Build payload with district and upazila names for backend
        const payload = {
            name: profileData.name.trim(),
            photoURL: profileData.photoURL.trim(),
            bloodGroup: profileData.bloodGroup,
            district: profileData.districtName,
            upazila: profileData.upazilaName,
        };

        try {
            setLoading(true);
            const token = await getIdToken(user)

            await axios.patch(`http://localhost:3000/Allusers/${user.email}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            setMainProfileData(payload);
            toast.success('Profile updated successfully!');
            setEditMode(false);
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">

            <h2 className="text-2xl font-bold text-[#AF3E3E] mb-6">Your Profile</h2>

            <button
                className="mb-4 px-4 py-2 bg-[#CD5656] text-white rounded hover:bg-[#AF3E3E] transition"
                onClick={() => setEditMode(!editMode)}
            >
                {editMode ? 'Cancel' : 'Edit'}
            </button>

            <form onSubmit={handleSave} className="space-y-4">
                {/* Photo URL */}
                <div>
                    <label className="block font-semibold mb-1">Avatar URL</label>
                    <input
                        type="url"
                        name="photoURL"
                        value={profileData.photoURL}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'
                            }`}
                    />
                    {profileData.photoURL && (
                        <img
                            src={profileData.photoURL}
                            alt="Avatar"
                            className="w-24 h-24 mt-2 rounded-full object-cover"
                        />
                    )}
                </div>

                {/* Name */}
                <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'
                            }`}
                    />
                </div>

                {/* Email (never editable) */}
                <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-3 py-2 border border-transparent bg-gray-100 rounded-md cursor-not-allowed"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block font-semibold mb-1">Blood Group</label>
                    <select
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'
                            }`}
                    >
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                            <option key={bg} value={bg}>
                                {bg}
                            </option>
                        ))}
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="block font-semibold mb-1">District</label>
                    <select
                        name="districtId"
                        value={profileData.districtId}
                        onChange={handleDistrictChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'
                            }`}
                    >
                        <option value="">Select District</option>
                        {districts[2].data.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Upazila */}
                <div>
                    <label className="block font-semibold mb-1">Upazila</label>
                    <select
                        name="upazilaId"
                        value={profileData.upazilaId}
                        onChange={handleUpazilaChange}
                        disabled={!editMode}
                        className={`w-full px-3 py-2 border rounded-md ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'
                            }`}
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                {editMode && (
                    <button
                        type="submit"
                        className="w-full bg-[#CD5656] hover:bg-[#AF3E3E] text-white py-2 rounded-md font-semibold transition"
                    >
                        Save
                    </button>
                )}
            </form>
        </div>
    );
};

export default Profile;
