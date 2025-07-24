import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import App from "../App";
import Login from "../Pages/Login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[


 {

  index:true,
  path:"/",




      },
      {
    path: "/auth/login",
    element: <Login></Login>
  },
  {
    path: "/auth/register",
    element: <Login></Login>
  },





    ]
  },
  
  {
    path: "/",
    element: <App></App>
  },
]);

export default Router