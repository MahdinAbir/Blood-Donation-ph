import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import districts from '../assets/districts.json';
import upazilas from '../assets/upazilas.json';
import { AuthContext } from '../Authentication/AuthContext';

import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { getIdToken } from 'firebase/auth';

const CreateReq = () => {
    const { user,mainProfileData } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    // Form state
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [formError, setFormError] = useState('');
    const [requesterName, setRequesterName] = useState("");

    // Form inputs state for controlled components
    const [recipientName, setRecipientName] = useState('');
    //   const [recipientDistrict, setRecipientDistrict] = useState('');
    const [recipientUpazila, setRecipientUpazila] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [donationTime, setDonationTime] = useState('');
    const [requestMessage, setRequestMessage] = useState('');

    // Fetch user status on mount



    useEffect(() => {
        const fetchUserStatus = async () => {

            if (user?.email)
                try {
                    setLoading(true);
                    const token = await getIdToken(user);

                    const res = await axios.get(
                        `http://localhost:3000/Allusers/${user.email}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    const status = res.data[0].status;
                    // Assuming res.data.status is 'active' or 'blocked'
                    if (status === 'Active') {
                        setRequesterName(res.data[0].name)
                        setActive(true);
                    }
                } catch (error) {
                    toast.error('Failed to verify user status');
                    setActive(false); // block form if error happens
                } finally {
                    setLoading(false);
                }
        };

        fetchUserStatus();
    }, [user]);










    // Handle district change (get id and set districtName, filter upazilas)
    const handleDistrictChange = (e) => {
        const selectedId = e.target.value;
        setSelectedDistrict(selectedId);

        if (!selectedId) {
            setDistrictName('');
            setFilteredUpazilas([]);
            setRecipientUpazila('');
            return;
        }

        const districtObj = districts[2].data.find((d) => d.id == selectedId);
        if (districtObj) {
            setDistrictName(districtObj.name);
        } else {
            setDistrictName('');
        }

        // Filter upazilas for selected district
        const filtered = upazilas[2].data.filter((u) => u.district_id == selectedId);
        setFilteredUpazilas(filtered);
        setRecipientUpazila(''); // reset upazila on district change
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        // Validation (basic example, you can expand)
        if (!recipientName.trim()) return setFormError('Recipient name is required.');
        if (!selectedDistrict) return setFormError('Please select recipient district.');
        if (!recipientUpazila) return setFormError('Please select recipient upazila.');
        if (!hospitalName.trim()) return setFormError('Hospital name is required.');
        if (!fullAddress.trim()) return setFormError('Full address is required.');
        if (!bloodGroup) return setFormError('Please select blood group.');
        if (!donationDate) return setFormError('Please select donation date.');
        if (!donationTime) return setFormError('Please select donation time.');


        // Build the request data object
        const ReqUserData = {
            requesterName: mainProfileData.name || '', // read-only from logged in user
            requesterEmail: user.email || '', // read-only from logged in user
            recipientName: recipientName.trim(),
            recipientDistrict: districtName,
            recipientUpazila,
            hospitalName: hospitalName.trim(),
            fullAddress: fullAddress.trim(),
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage: requestMessage.trim(),
            donationStatus: 'pending', // default, no input field
            createdAt: new Date(),
        };

        try {
            setLoading(true);
            // Post to your API (adjust URL)
            const token = await getIdToken(user);
            const res = await axios.post(
                'http://localhost:3000/Recipients',
                ReqUserData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success('Donation request created successfully!');
            // Optionally clear form here
            setRecipientName('');
            setSelectedDistrict('');
            setDistrictName('');
            setFilteredUpazilas([]);
            setRecipientUpazila('');
            setHospitalName('');
            setFullAddress('');
            setBloodGroup('');
            setDonationDate('');
            setDonationTime('');
            setRequestMessage('');
        } catch (error) {
            toast.error('Failed to create donation request.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    if (!active)
        return (
            <div className="p-8 text-center text-red-600 font-semibold">
                Your account is blocked. You cannot create donation requests.
            </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-md shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-[#AF3E3E]">Create Donation Request 🆕</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Requester name (read-only) */}
                <div>
                    <label className="block font-semibold mb-1">Requester Name</label>
                    <input
                        type="text"
                        value={requesterName || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>

                {/* Requester email (read-only) */}
                <div>
                    <label className="block font-semibold mb-1">Requester Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>

                {/* Recipient name */}
                <div>
                    <label className="block font-semibold mb-1">Recipient Name</label>
                    <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        required
                        placeholder="Recipient's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Recipient district */}
                <div>
                    <label className="block font-semibold mb-1">Recipient District</label>
                    <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select District</option>
                        {districts[2].data.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Recipient upazila */}
                <div>
                    <label className="block font-semibold mb-1">Recipient Upazila</label>
                    <select
                        value={recipientUpazila}
                        onChange={(e) => setRecipientUpazila(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={!selectedDistrict}
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((u) => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Hospital name */}
                <div>
                    <label className="block font-semibold mb-1">Hospital Name</label>
                    <input
                        type="text"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        required
                        placeholder="e.g. Dhaka Medical College Hospital"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Full address line */}
                <div>
                    <label className="block font-semibold mb-1">Full Address Line</label>
                    <input
                        type="text"
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        required
                        placeholder="e.g. Zahir Raihan Rd, Dhaka"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Blood group */}
                <div>
                    <label className="block font-semibold mb-1">Blood Group</label>
                    <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                            <option key={bg} value={bg}>
                                {bg}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Donation date */}
                <div>
                    <label className="block font-semibold mb-1">Donation Date</label>
                    <input
                        type="date"
                        value={donationDate}
                        onChange={(e) => setDonationDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Donation time */}
                <div>
                    <label className="block font-semibold mb-1">Donation Time</label>
                    <input
                        type="time"
                        value={donationTime}
                        onChange={(e) => setDonationTime(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Request message */}
                <div>
                    <label className="block font-semibold mb-1">Request Message</label>
                    <textarea
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        required
                        rows={4}
                        placeholder="Explain why you need blood..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                    />
                </div>

                {/* Submit button */}
                {formError && <p className="text-red-500 font-semibold">{formError}</p>}
                <button
                    type="submit"
                    className="w-full bg-[#CD5656] hover:bg-[#AF3E3E] text-white py-2 rounded-md font-semibold transition"
                >
                    Request
                </button>
            </form>
        </div>
    );
};

export default CreateReq;
