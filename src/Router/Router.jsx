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





    ]
  },
  
  {
    path: "/dashboard",
    element: <DashboardRedirect></DashboardRedirect>
  },
  {
    path: "/unauthorized",
    element: <Unauthorized></Unauthorized>
  },
  {
    path: "/dashboard/donor",
    element: <Donor></Donor>,
    children: [

      {
index:true,
path:"/dashboard/donor",
element:<DonorHome></DonorHome>


      },

      {
path:"/dashboard/donor/create-donation-request",
element:<CreateReq></CreateReq>
      },
      {
path:"/dashboard/donor/my-donation-requests",
element:<BloodReq></BloodReq>
      },
      
      {
path:"/dashboard/donor/profile",
element:<Profile></Profile>
      },
      {
path:"/dashboard/donor/view/:id",
element:<Details></Details>
      },
      {
path:"/dashboard/donor/edit/:id",
element:<Edit></Edit>
      },

    ]
  },
  {
    path: "/dashboard/Volunteer",
    element: <Volunteer></Volunteer>,

children: [

      {
index:true,
path:"/dashboard/Volunteer",
element:<div>  <DashboardStats></DashboardStats>
<VolunteerHome></VolunteerHome>

     </div>


      },
      {
path:"/dashboard/Volunteer/All-donation-requests",
element:<AllReq></AllReq>
      },
      {
path:"/dashboard/Volunteer/create-donation-request",
element:<CreateReq></CreateReq>
      },
      {
path:"/dashboard/Volunteer/profile",
element:<Profile></Profile>
      },


    
    
    ]



  },
  
  {
    path: "/dashboard/Admin",
    element: <Admin></Admin>,
    children: [


{
  index:true,
  path:"/dashboard/Admin",
  element: <div>  
    <DashboardStats></DashboardStats>
    
     <AdminHome></AdminHome>
    </div>

},
{
path:"/dashboard/Admin/Allusers",
element: <AllUsers></AllUsers>

}, 
{
path:"/dashboard/Admin/create-donation-request",
element:<CreateReq></CreateReq>
      },
{
path:"/dashboard/Admin/All-donation-requests",
element:<AllReq></AllReq>
      },
{
path:"/dashboard/Admin/profile",
element:<Profile></Profile>
      },
       {
path:"/dashboard/Admin/view/:id",
element:<Details></Details>
      },
      {
path:"/dashboard/Admin/edit/:id",
element:<Edit></Edit>
      },



    ]
  },
]);

export default Router