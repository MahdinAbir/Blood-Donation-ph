import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import districts from '../assets/districts.json';
import upazilas from '../assets/upazilas.json';

import { AuthContext } from '../Authentication/AuthContext';
import axios from 'axios';

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [districtName, setdistrictName] = useState('');
  
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const navigate = useNavigate();
  const { registerWithEmail, updateUser, user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    const value = e.target.value;
    const district = districts[2].data.find((d) => d.id == value);
    setdistrictName(district.name);
  };

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas[2].data.filter(
        (u) => u.district_id === selectedDistrict
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
        formData
      );
      setImageUrl(res.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const blood = form.blood.value;
    const upazilaName = form.upazila.value;

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must include at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must include at least one lowercase letter.');
      return;
    }
    if (!imageUrl) {
      toast.error('Please upload a profile picture.');
      return;
    }
    setPasswordError('');

    try {
      await registerWithEmail(email, password);
      await updateUser({ displayName: name, photoURL: imageUrl });

      const userData = {
        name,
        email,
        photoURL: imageUrl,
        bloodGroup: blood,
        district: districtName,
        upazila: upazilaName,
        status: "Active",
        role: "Donor",
        createdAt: new Date()
      };

      await axios.post('https://lifedrop-server-pi.vercel.app/AllUsers', { userData });
      toast.success('Registered successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (user) return <p className="text-center py-10 text-xl text-green-600">You're already logged in.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAEBD0] px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden mt-20">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 bg-[#FFF2EB] flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold text-[#AF3E3E] mb-2">Sign Up & Save Lives!</h2>
          <p className="text-[#511D43] text-center max-w-xs">
            Register to donate blood, help others, and spread kindness.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-10 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#AF3E3E] mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-6">Create a new donor/volunteer account</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input type="text" name="name" required placeholder="Your name" className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800" />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input type="email" name="email" required placeholder="Enter email" className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800" />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass(!showPass);
                  }}
                  className="absolute top-2 right-2"
                >
                  <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            <div>
  <label className="block text-gray-700 mb-1">Profile Picture</label>
  <div className="bg-[#FFE8CD] border border-dashed border-[#CD5656] rounded-md p-4">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="block w-full text-sm text-gray-800"
    />
    {fileName && (
      <p className="text-sm text-gray-700 mt-2">
        Selected: <span className="italic">{fileName}</span> {uploading && ' (Uploading...)'}
      </p>
    )}
  </div>
</div>


            <div>
              <label className="block text-gray-700 mb-1">Blood Group</label>
              <select name="blood" required className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800">
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">District</label>
              <select
                name="district"
                required
                onChange={handleDistrictChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
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
                name="upazila"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-[#CD5656] hover:bg-[#AF3E3E] text-white py-2 rounded-md font-semibold transition disabled:opacity-60"
            >
              {uploading ? 'Uploading Image...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account? <Link to="/auth/login" className="text-[#DC2525] hover:underline font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
