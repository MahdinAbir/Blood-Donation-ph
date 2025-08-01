import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loader from "./Loader";

const PublishedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:3000/blogs/published") // Already filtered from backend
      .then((res) => {
        setBlogs(res.data);
        setLoading(false)
      })
      .catch(() => {
        console.error("Failed to fetch blogs");
      });
  }, []);

    if(loading)
    return (<Loader></Loader>  )


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-[#511D43] underline decoration-[#DC2525] underline-offset-8">
        Published Blogs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#FFDCDC] hover:bg-[#FFE8CD] transition-all duration-300 shadow-lg rounded-lg overflow-hidden border-2 border-[#AF3E3E]"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-[#901E3E]">{blog.title}</h2>
              <p
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.content?.slice(0, 100) + "..." }}
              />
              <Link
                to={`/auth/blogs/${blog._id}`}
                className="inline-block mt-2 px-4 py-2 bg-[#DC2525] text-white rounded hover:bg-[#AF3E3E] transition-all"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublishedBlogs;
