import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { tokenholder } from "../../State/tokenslice/TokenSlice";
import { useNavigate,Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface formData {
    name: string;
    email: string;
    password: string;
    phone: string;
  }

  type SignupResponse = {
    message: string;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
    token: string;
  };

  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("Submitting your information...");

    try {
      const response = await axios.post<SignupResponse>(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData,
        { withCredentials: true }
      );

      if (response.data.token) {
        dispatch(tokenholder(response.data.token, response.data.user.name));
        toast.success("Signup successful!");
        navigate("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-200 to-blue-400">
      <div className="bg-white rounded-xl shadow-md w-[350px] p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4 text-left">
            <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-left">
            <label htmlFor="password" className="block font-semibold text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6 text-left">
            <label htmlFor="phone" className="block font-semibold text-gray-700 mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{11}"
              title="Phone number must be 11 digits"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
          <ToastContainer position="top-right" />
        </form>
          <div className="text-black pt-7 text-xl">
          <p>To Login Click Here <Link to = "/login" className="text-2xl text-blue-500 underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
