import { Link } from "react-router"
import {
  FaUserEdit,
  FaAddressCard,
  FaHeart,
  FaSignOutAlt,
  FaEnvelope,
} from "react-icons/fa"
import { use } from "react"
import { AuthContext } from "../../provider/AuthContext"
import Swal from "sweetalert2"

export default function SideBar() {
  const { logOut } = use(AuthContext)

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Congratulations",
          text: "You Have Successfully Logged Out",
          timer: 1400,
          showConfirmButton: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 shadow-md flex flex-col justify-between p-6">
      {/* Top Nav Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/dashboard/edit-bio-data"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
          >
            <FaUserEdit /> Edit Biodata
          </Link>

          <Link
            to="/dashboard/view-biodata"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
          >
            <FaAddressCard /> View Biodata
          </Link>

          <Link
            to="/dashboard/contact-requests"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
          >
            <FaEnvelope /> My Contact Request
          </Link>

          <Link
            to="/dashboard/favourites"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
          >
            <FaHeart /> Favourites Biodata
          </Link>
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div>
        <Link to="/login">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:text-red-800 font-medium transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </Link>
      </div>
    </aside>
  )
}
