import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import App from "../App";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Components/Home";
import DashboardRedirect from "../Components/DashBoardRedirect";
import Unauthorized from "../Components/Unauthorized";
import Donor from "../DashBoardLayout/Donor";
import Volunteer from "../DashBoardLayout/Volunteer";
import Admin from "../DashBoardLayout/Admin";
import BloodReq from "../Donor/BloodReq";
import DonorHome from "../Donor/DonorHome";
import CreateReq from "../Donor/CreateReq";
import Profile from "../DashBoardLayout/Profile";


import AllUsers from "../Admin/AllUsers";
import AdminHome from "../Admin/AdminHome";
import Details from "../DashBoardLayout/Details";
import Edit from "../DashBoardLayout/Edit";
import AllReq from "../DashBoardLayout/AllReq";
import DashboardStats from "../DashBoardLayout/DashBoardStats";
import VolunteerHome from "../Volunteer/VolunteerHome";
import PendingRequests from "../Components/PendingRequests";
import PrivateRoute from "./PrivateRoute";
import Blog from "../Components/Blog";
import Fund from "../Components/Fund";
import Error from "../Pages/Error";
import AddBlog from "../Admin/AddBlog";
import AllBlogs from "../Admin/AllBlogs";
import BlogDetails from "../Components/BlogDetails";
import PublishedBlogs from "../Components/PublishedBlogs";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[


 {

  index:true,
  path:"/",
  element:<Home></Home>,




      },
      {
    path: "/auth/login",
    element: <Login></Login>
  },
  {
    path: "/auth/register",
    element: <Register></Register>
  },
  {
    path: "/auth/donations",
    element: <PendingRequests></PendingRequests>
  },
  {
    path: "/auth/blogs",
    element: <PublishedBlogs></PublishedBlogs>
  },
  {
    path: "/auth/blogs/:id",
    element: <BlogDetails></BlogDetails>
  },
  {
    path: "/auth/fund",
    element: <PrivateRoute> <Fund></Fund> </PrivateRoute>
  },





    ]
  },
  
  {
    path: "/dashboard",
    element: <PrivateRoute>   <DashboardRedirect></DashboardRedirect>  </PrivateRoute>
    
  },
  {
    path: "/unauthorized",
    element: <Unauthorized></Unauthorized>
  },
  {
  path: "/dashboard/donor",
  element: <PrivateRoute><Donor /></PrivateRoute>,
  children: [
    {
      index: true,
      path: "/dashboard/donor",
      element: <PrivateRoute><DonorHome /></PrivateRoute>
    },
    {
      path: "/dashboard/donor/create-donation-request",
      element: <PrivateRoute><CreateReq /></PrivateRoute>
    },
    {
      path: "/dashboard/donor/my-donation-requests",
      element: <PrivateRoute><BloodReq /></PrivateRoute>
    },
    {
      path: "/dashboard/donor/profile",
      element: <PrivateRoute><Profile /></PrivateRoute>
    },
    {
      path: "/dashboard/donor/view/:id",
      element: <PrivateRoute><Details /></PrivateRoute>
    },
    {
      path: "/dashboard/donor/edit/:id",
      element: <PrivateRoute><Edit /></PrivateRoute>
    },
  ]
},
{
  path: "/dashboard/Volunteer",
  element: <PrivateRoute><Volunteer /></PrivateRoute>,
  children: [
    {
      index: true,
      path: "/dashboard/Volunteer",
      element: <PrivateRoute><div><DashboardStats /><VolunteerHome /></div></PrivateRoute>
    },
    {
      path: "/dashboard/Volunteer/All-donation-requests",
      element: <PrivateRoute><AllReq /></PrivateRoute>
    },
    {
      path: "/dashboard/Volunteer/content-management/addblog",
      element: <PrivateRoute>  <AddBlog></AddBlog>  </PrivateRoute>
    },

    {
      path: "/dashboard/Volunteer/content-management/allblog",
      element: <PrivateRoute>  <AllBlogs></AllBlogs>  </PrivateRoute>
    },
    {
      path: "/dashboard/Volunteer/create-donation-request",
      element: <PrivateRoute><CreateReq /></PrivateRoute>
    },
    {
      path: "/dashboard/Volunteer/profile",
      element: <PrivateRoute><Profile /></PrivateRoute>
    },
  ]
},
{
  path: "/dashboard/Admin",
  element: <PrivateRoute><Admin /></PrivateRoute>,
  children: [
    {
      index: true,
      path: "/dashboard/Admin",
      element: <PrivateRoute><div><DashboardStats /><AdminHome /></div></PrivateRoute>
    },
    {
      path: "/dashboard/Admin/Allusers",
      element: <PrivateRoute><AllUsers /></PrivateRoute>
    },
    {
      path: "/dashboard/Admin/create-donation-request",
      element: <PrivateRoute><CreateReq /></PrivateRoute>
    },
    {
      path: "/dashboard/Admin/All-donation-requests",
      element: <PrivateRoute><AllReq /></PrivateRoute>
    },
    {
      path: "/dashboard/Admin/profile",
      element: <PrivateRoute><Profile /></PrivateRoute>
    },
    {
      path: "/dashboard/Admin/content-management/addblog",
      element: <PrivateRoute>  <AddBlog></AddBlog>  </PrivateRoute>
    },
    {
      path: "/dashboard/Admin/content-management/allblog",
      element: <PrivateRoute>  <AllBlogs></AllBlogs>  </PrivateRoute>
    },
    {
      path: "/dashboard/Admin/view/:id",
      element: <PrivateRoute><Details /></PrivateRoute>
    },
    {
      path: "/dashboard/Admin/edit/:id",
      element: <PrivateRoute><Edit /></PrivateRoute>
    },
  ]
},
{path: "/*",
            element: <Error></Error>
        },




]);

export default Router