import { FileText, LogOut, User } from "lucide-react"; // Added FileText
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postReq } from "../../Api/axios";

const Sidebar = () => {
  const navigate = useNavigate();


  const Logout = async () => {
    try {
      const response = await postReq("/auth/logout");
      toast.success("logout successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`flex h-screen ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gray-800`}
    >
      <div className="flex flex-col h-full">
        <button
          className="text-white p-4 focus:outline-none hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>

        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-4">
            <li>
              <button
                onClick={Logout}
                className="flex items-center gap-4 w-full text-white text-sm hover:bg-gray-700 p-2 rounded-md"
              >
                <LogOut />
                {isOpen && <span>Logout</span>}
              </button>
            </li>
            <li>
              <NavLink
                to="applicationform"
                className="flex items-center gap-4 text-white text-sm hover:bg-gray-700 p-2 rounded-md"
              >
                <FileText />
                {isOpen && <span>Application Form</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="allApplication"
                className="flex items-center gap-4 text-white text-sm hover:bg-gray-700 p-2 rounded-md"
              >
                <User />
                {isOpen && <span>All Applications</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4"></div>
      </div>
    </div>
  );
};

export default Sidebar;
