import { createBrowserRouter } from "react-router";
import Error from "../pages/Error";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute";
import EditBiodataForm from "../pages/DashBoard/EditBiodataForm";


const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
        {
            path:'/dashboard/edit-bio-data',
            Component:EditBiodataForm
        }
    ]
  },
  {
    path: "/*",
    Component: Error,
  },
]);
export default router;
