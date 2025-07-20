import { NavLink } from "react-router";
import {
  FaHome,
  FaUsersCog,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";

export default function AdminMenu() {
  return (
    <nav className="flex flex-col space-y-4">
     

      <NavLink
        to="/dashboard/manage-users"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaUsersCog /> Manage Users
      </NavLink>

      <NavLink
        to="/dashboard/approved-premium"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaCheckCircle /> Approve Premium
      </NavLink>

      <NavLink
        to="/dashboard/approved-contact-request"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <FaEnvelopeOpenText /> Approve Contact Requests
      </NavLink>
      <NavLink
        to="/dashboard/admin-success-story"
        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
      >
        <RiChatHistoryFill />
  Success Story
      </NavLink>

      
    </nav>
  );
}
