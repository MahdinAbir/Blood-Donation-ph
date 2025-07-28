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
path:"/dashboard/donor/my-donation-requests",
element:<BloodReq></BloodReq>
      },
      {
path:"/dashboard/donor/create-donation-request",
element:<CreateReq></CreateReq>
      },

    ]
  },
  {
    path: "/dashboard/volunteer",
    element: <Volunteer></Volunteer>
  },
  {
    path: "/dashboard/admin",
    element: <Admin></Admin>
  },
]);

export default Router