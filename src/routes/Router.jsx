import { createBrowserRouter } from "react-router";
import Error from "../pages/Error";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute";
import EditBiodataForm from "../pages/DashBoard/EditBiodataForm";
import ViewBioData from "../pages/DashBoard/ViewBioData";
import AllBioData from "../pages/BioDatas/AllBioData";
import BioDetails from "../pages/BioDatas/BioDetails";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import CheckOut from "../pages/CheckOut/CheckOut";

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
        path: "/biodatas",
        element:
          <AllBioData></AllBioData>
        
      },
      {
        path:'/biodatas/:id',
        element:<PrivateRoute>
          <BioDetails></BioDetails>
        </PrivateRoute>

      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path:'/about-us',
        Component:AboutUs
      },
      {
        path:'/contact-us',
        Component:ContactUs
      },
      {
        path:'/checkout/:id',
        Component:CheckOut
      },

    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/edit-bio-data",
        Component: EditBiodataForm,
      },
      {
        path: "/dashboard/view-bio-data",
        Component: ViewBioData,
      },
    ],
  },
  {
    path: "/*",
    Component: Error,
  },
]);
export default router;
