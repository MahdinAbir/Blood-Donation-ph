import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Authentication/AuthContext";
import { NavLink } from "react-router";
import { getIdToken } from "firebase/auth";

const AllBlogs = () => {
  const { mainProfileData,user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  

   useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = await getIdToken(user); 
        const res = await axios.get("http://localhost:3000/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
      } catch (err) {
        toast.error("Failed to fetch blogs");
      }
    };

    if (user) {
      fetchBlogs();
    }
  }, [user]);

const handlePublishToggle = async (id, status) => {
    const newStatus = status === "draft" ? "published" : "draft";
    try {
      const token = await getIdToken(user); 
      await axios.patch(
        `http://localhost:3000/Blogs/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Blog ${newStatus === "published" ? "published" : "unpublished"}`
      );
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    } catch (error) {
      toast.error("Failed to update blog status");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getIdToken(user); 
      await axios.delete(`http://localhost:3000/Blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog deleted");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const filteredBlogs = filter === "all" ? blogs : blogs.filter(b => b.status === filter);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
     <div className="flex justify-between
     " >
 <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
 <NavLink to={"/dashboard/Admin/content-management/addblog"}  >   <button className="text-3xl btn bg-lime-300 rounded-2xl px-5 py-4  text-blue-600 font-bold mb-6" >     Create Blog         </button>            </NavLink>

     </div>

      <div className="mb-6 flex justify-between items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <div>
          Page: {currentPage} / {totalPages}
        </div>
      </div>

      {paginatedBlogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col md:flex-row gap-4 border rounded-lg shadow p-4 mb-6 bg-white"
        >
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full md:w-48 h-48 object-cover rounded md:aspect-square"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{blog.title}</h2>

            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  blog.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {blog.status === "published" ? "Published" : "Draft"}
              </span>
            </div>

            <div
              className="text-gray-700 my-2"
              dangerouslySetInnerHTML={{ __html: blog.content?.slice(0, 200) + "..." }}
            />
            <div className="flex gap-2 mt-4 flex-wrap">
              {mainProfileData?.role === "Admin" && (
                <>
                  <button
                    onClick={() => handlePublishToggle(blog._id, blog.status)}
                    className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 cursor-pointer text-sm"
                  >
                    {blog.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 cursor-pointer text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
              
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
