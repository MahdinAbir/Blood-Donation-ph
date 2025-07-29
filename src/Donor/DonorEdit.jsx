import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { AuthContext } from "../Authentication/AuthContext";

import districts from "../assets/districts.json";
import upazilas from "../assets/upazilas.json";
import { toast } from "react-toastify";

const DonorEdit = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await getIdToken(user);
        const res = await axios.get(`http://localhost:3000/Recipients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
        const district = districts[2].data.find(d => d.name === res.data.recipientDistrict);
        if (district) {
          setSelectedDistrict(district.id);
        }
      } catch (err) {
        setError("Failed to load request data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas[2].data.filter(u => u.district_id === selectedDistrict);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    const district = districts[2].data.find(d => d.id === e.target.value);
    if (district) {
      setFormData(prev => ({ ...prev, recipientDistrict: district.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = await getIdToken(user);
      await axios.patch(
        `http://localhost:3000/Recipients/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Request updated successfully!");
      
    } catch (err) {
      setError("Failed to update request.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-[#AF3E3E] mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ReadOnlyInput label="Requester Name" value={formData.requesterName} />
        <ReadOnlyInput label="Requester Email" value={formData.requesterEmail} />

        <EditableInput label="Recipient Name" name="recipientName" value={formData.recipientName} onChange={handleChange} />

        <div>
          <label className="block text-gray-700 mb-1">District</label>
          <select
            name="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select District</option>
            {districts[2].data.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Upazila</label>
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        <EditableInput label="Hospital Name" name="hospitalName" value={formData.hospitalName} onChange={handleChange} />
        <EditableInput label="Full Address" name="fullAddress" value={formData.fullAddress} onChange={handleChange} />
        <EditableInput label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
        <EditableInput label="Donation Date" name="donationDate" type="date" value={formData.donationDate} onChange={handleChange} />
        <EditableInput label="Donation Time" name="donationTime" type="time" value={formData.donationTime} onChange={handleChange} />
        <EditableInput label="Request Message" name="requestMessage" value={formData.requestMessage} onChange={handleChange} />

        <button
          type="submit"
          disabled={saving}
          className="bg-[#AF3E3E] text-white px-5 py-2 rounded hover:bg-[#8b2c2c] transition"
        >
          {saving ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
};

const ReadOnlyInput = ({ label, value }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input value={value || ""} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
  </div>
);

const EditableInput = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
    />
  </div>
);

export default DonorEdit;
