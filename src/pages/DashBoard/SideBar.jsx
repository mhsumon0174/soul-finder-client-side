import { Link, NavLink } from "react-router";
import {
  FaUserEdit,
  FaAddressCard,
  FaHeart,
  FaSignOutAlt,
  FaEnvelope,
  FaBackward,
} from "react-icons/fa";
import { use } from "react";

import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import CustomerMenu from "./CustomerMenu";

export default function SideBar() {
  const { logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Congratulations",
          text: "You Have Successfully Logged Out",
          timer: 1400,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <aside className="w-64 h-screen  border-r   flex flex-col justify-between p-6">
      {/* Top Nav Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-right md:text-left ">Dashboard</h2>
        <CustomerMenu></CustomerMenu>
      </div>

      {/* Logout Button at Bottom */}
      <div >
        
        <NavLink  to="/">
          <button
            
            className="flex items-center gap-3 text-red-600 hover:text-red-800 font-medium transition"
          >
            <FaBackward/> Home
          </button>
        </NavLink>
        <NavLink to="/login">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:text-red-800 font-medium transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </NavLink>
      </div>
    </aside>
  );
}
