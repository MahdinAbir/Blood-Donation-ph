import React, { useState, useEffect } from "react";
import axios from "axios";

import districts from "../assets/districts.json";
import upazilas from "../assets/upazilas.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
  // Form state
  const [formData, setFormData] = useState({
    bloodGroup: "",
    districtId: "",
    upazilaName: "",
  });

  const [districtName, setDistrictName] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Results and UI state
  const [donors, setDonors] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update filtered upazilas & district name when district changes
  useEffect(() => {
    if (!formData.districtId) {
      setFilteredUpazilas([]);
      setDistrictName("");
      setFormData((prev) => ({ ...prev, upazilaName: "" }));
      return;
    }

    const district = districts[2].data.find((d) => d.id === formData.districtId);
    if (district) {
      setDistrictName(district.name);

      const ups = upazilas[2].data.filter(
        (u) => u.district_id === formData.districtId
      );
      setFilteredUpazilas(ups);

      // Clear upazila selection on district change
      setFormData((prev) => ({ ...prev, upazilaName: "" }));
    } else {
      setDistrictName("");
      setFilteredUpazilas([]);
      setFormData((prev) => ({ ...prev, upazilaName: "" }));
    }
  }, [formData.districtId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Search handler with flexible filtering
  const handleSearch = async (e) => {
    e.preventDefault();

    setShowResults(false);
    setError("");
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/donors"); // Replace with your API URL
      const allDonors = res.data;

      const filtered = allDonors.filter((donor) => {
        const bloodMatch = formData.bloodGroup ? donor.bloodGroup === formData.bloodGroup : true;
        const districtMatch = districtName ? donor.district === districtName : true;
        const upazilaMatch = formData.upazilaName ? donor.upazila === formData.upazilaName : true;

        return bloodMatch && districtMatch && upazilaMatch;
      });

      setDonors(filtered);
      setShowResults(true);
    } catch (err) {
      setError("Failed to fetch donors. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEBD0] py-12 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-center text-[#AF3E3E] mb-10">
        🔍 Search for Donors Near You
      </h1>

      <form
        onSubmit={handleSearch}
        className="bg-white max-w-6xl mx-auto p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 border border-[#FFD6BA]"
      >
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="p-3 border rounded-md text-gray-700"
        >
          <option value="">Select Blood Group (optional)</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="districtId"
          value={formData.districtId}
          onChange={handleChange}
          className="p-3 border rounded-md text-gray-700"
        >
          <option value="">Select District (optional)</option>
          {districts[2].data.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="upazilaName"
          value={formData.upazilaName}
          onChange={handleChange}
          disabled={!filteredUpazilas.length}
          className="p-3 border rounded-md text-gray-700"
        >
          <option value="">Select Upazila (optional)</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-[#CD5656] hover:bg-[#AF3E3E] text-white font-bold py-2 rounded-md"
        >
          Search
        </button>
      </form>

      <div className="max-w-7xl mx-auto mt-10">
        {!showResults ? (
          <p className="text-center text-xl text-[#511D43] font-medium mt-16">
            🔎 Start by searching to find a donor near you!
            <br />
            Fill out any of the fields above and click Search.
          </p>
        ) : loading ? (
          <p className="text-center text-lg text-[#AF3E3E] font-semibold">Loading donors...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600 font-semibold">{error}</p>
        ) : donors.length === 0 ? (
          <p className="text-center text-lg text-red-600 font-semibold">
            ❌ No donors found for the selected criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-xl shadow-lg border border-[#FFE8CD] p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
              >
                <img
                  src={donor.photoURL}
                  alt={donor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#FFDCDC] mb-4"
                />
                <h2 className="text-xl font-semibold text-[#511D43]">{donor.name}</h2>
                <p className="text-sm text-gray-500">{donor.email}</p>
                <p className="mt-2 text-[#AF3E3E] font-medium">🩸 Blood Group: {donor.bloodGroup}</p>
                <p className="text-gray-600">
                  📍 {donor.upazila}, {donor.district}
                </p>
                <span
                  className={`mt-3 text-sm font-semibold px-3 py-1 rounded-full ${
                    donor.status === "Blocked"
                      ? "bg-red-200 text-red-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {donor.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
