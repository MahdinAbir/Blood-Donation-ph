import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/published/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => console.error("Failed to fetch blog details"));
  }, [id]);

  if (!blog) {
    return <div className="text-center py-10 text-xl text-gray-600">Loading blog...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        to="/auth/blogs"
        className="inline-block mb-6 text-white bg-[#901E3E] px-4 py-2 rounded hover:bg-[#511D43] transition-all"
      >
        ← Back to Blogs
      </Link>

      <div className="bg-white rounded-lg shadow-md border border-[#FFD6BA]">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-t-lg"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-[#AF3E3E]">{blog.title}</h1>
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
