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
import MyContactRequest from "../pages/DashBoard/MyContactRequest";
import MyFavouritesTable from "../pages/DashBoard/MyFavouritesTable";
import GotMarried from "../pages/DashBoard/GotMarried";
import ManageUsers from "../pages/DashBoard/Admin/ManageUsers";
import ApprovedPremium from "../pages/DashBoard/Admin/ApprovedPremium";
import ApprovedContactRequest from "../pages/DashBoard/Admin/ApprovedContactRequest";
import AdminSuccessStory from "../pages/DashBoard/Admin/AdminSuccessStory";

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
        element: <AllBioData></AllBioData>,
      },
      {
        path: "/biodatas/:id",
        element: (
          <PrivateRoute>
            <BioDetails></BioDetails>
          </PrivateRoute>
        ),
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
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/checkout/:id",
        element:<PrivateRoute><CheckOut></CheckOut></PrivateRoute>
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
        element:<PrivateRoute>
          <EditBiodataForm></EditBiodataForm>
        </PrivateRoute>
      },
      {
        path: "/dashboard/view-bio-data",
        element:<PrivateRoute>
         <ViewBioData></ViewBioData>
        </PrivateRoute>
      },
      {
        path: "/dashboard/my-contact-request",
       element:<PrivateRoute>
          <MyContactRequest></MyContactRequest>
        </PrivateRoute>
      },
      {
        path: "/dashboard/my-favorites",
        element:<PrivateRoute>
         <MyFavouritesTable></MyFavouritesTable>
        </PrivateRoute>
      },
      {
        path: "/dashboard/got-married",
        element:<PrivateRoute>
         <GotMarried></GotMarried>
        </PrivateRoute>
      },
      {
        path:'/dashboard/manage-users',
        element:<PrivateRoute>
          <ManageUsers></ManageUsers>
        </PrivateRoute>
      },
      {
        path:'/dashboard/approved-premium',
        element:<PrivateRoute>
          <ApprovedPremium/>
        </PrivateRoute>
      },
      {
        path:'/dashboard/approved-contact-request',
        element:<PrivateRoute>
          <ApprovedContactRequest/>
        </PrivateRoute>
      },
      {
        path:'/dashboard/admin-success-story',
        element:<PrivateRoute>
         <AdminSuccessStory/>
        </PrivateRoute>
      },

    ],
  },
  {
    path: "/*",
    Component: Error,
  },
]);
export default router;
