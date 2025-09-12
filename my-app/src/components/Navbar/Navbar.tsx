import { useSelector, useDispatch } from "react-redux";
import React from "react";
import type { RootState } from "../../State/store/Store";
import { cleartoken } from "../../State/tokenslice/TokenSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const Token = useSelector((state: RootState) => state.auth["access-token"]);
  const dispatch = useDispatch();

  // Function to remove cookies from backend
  const cookiesremover = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/remove",
        {},
        { withCredentials: true }
      );
      console.log("Cookies removed successfully");
    } catch (error) {
      console.error("Error removing cookies:", error);
    }
  };

  // Function to logout
  const clearToken = async () => {
    dispatch(cleartoken()); // clear from redux
    await cookiesremover(); // clear from backend
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="w-screen h-20 flex items-center px-8 text-white 
      bg-gradient-to-r from-indigo-900 via-purple-800 to-black shadow-md"
    >
      <div className="flex-1 text-left text-2xl"></div>
      <div className="flex-1 text-center text-2xl">
        <ul>
          <li>TO-DO-LIST</li>
        </ul>
      </div>

      <div
        className="flex-1 text-right text-2xl cursor-pointer"
        onClick={() => {
          if (Token) {
            clearToken();
          } else {
            navigate("/login");
          }
        }}
      >
        {Token ? "Logout" : "Login"}
      </div>
    </nav>
  );
};

export default Navbar;
