import React, { useState, useRef, useContext } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";


import { getIdToken } from "firebase/auth";
import Loader from "../Components/Loader";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddBlog = () => {
  const editor = useRef(null);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setThumbnailFile(e.target.files[0]);
      setThumbnailName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !thumbnailFile || !content.trim()) {
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Please fill out all fields.',
});

      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", thumbnailFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
        formData
      );
      const imageUrl = imgbbRes.data.data.url;

      const blogData = {
        title: title.trim(),
        thumbnail: imageUrl,
        content: content.trim(),
        status: "draft",
        authorEmail: user.email,
        createdAt: new Date(),
      };
const token = getIdToken(user)
       const res = await axios.post(
      'http://localhost:3000/Blogs', 
      blogData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
console.log(res.data.insertedId)
      if (res.data.insertedId) {
        Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Blog created successfully!',
});

        setTitle("");
        setThumbnailFile(null);
        setThumbnailName("");
        setContent("");
      } else {
        Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Failed to create blog.',
});

      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Error creating blog, please try again.");
    } finally {
      setLoading(false);
    }
  };


  if(loading)
  {

    return  <Loader></Loader>
  }


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
     
      <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
          disabled={loading}
          required
        />

        
        <div className="flex items-center space-x-4">
          
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />

          
          <label
            htmlFor="thumbnail"
            className={`cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Choose Image
          </label>

          {/* File name */}
          <span className="italic text-gray-700 truncate max-w-xs">
            {thumbnailName || "No file chosen"}
          </span>
        </div>

       
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          disabled={loading}
        />

       
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>

<NavLink to={"/dashboard/Admin/content-management/allblog"}  >   <button className="text-xl btn bg-lime-300 rounded-2xl px-5 py-4  text-blue-600 font-bold my-10  " >     See ALL Blogs         </button>            </NavLink>

    </div>
  );
};

export default AddBlog;
