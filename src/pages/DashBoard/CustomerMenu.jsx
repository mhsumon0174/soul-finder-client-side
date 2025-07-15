
import { NavLink } from "react-router";
import {
  FaUserEdit,
  FaAddressCard,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";

export default function CustomerMenu() {
  return (
    <nav className="flex flex-col space-y-4">
      <NavLink
        to="/dashboard/edit-bio-data"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaUserEdit /> Edit Biodata
      </NavLink>

      <NavLink
        to="/dashboard/view-bio-data"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaAddressCard /> View Biodata
      </NavLink>

      <NavLink
        to="/dashboard/contact-requests"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaEnvelope /> My Contact Request
      </NavLink>

      <NavLink
        to="/dashboard/favourites"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaHeart /> Favourites Biodata
      </NavLink>
    </nav>
  );
}
