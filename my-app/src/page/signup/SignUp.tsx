import { useState } from "react";
import axios from "axios";
import './SignUp.css';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { tokenholder } from "../../State/tokenslice/TokenSlice"
import { useNavigate } from "react-router-dom";


function Signup () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    interface formData  {
      name:string;
      email:string;
      password:string;
      phone:string
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
      phone: ""
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
     
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
  
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Submitting:", formData);
      toast.info("Submitting your information...");
  
      try {
        const response = await axios.post<SignupResponse>(
          "http://localhost:5000/api/auth/signup",
          formData,
          {withCredentials: true}
        );
        console.log("Signup success:", response.data);



        if (response.data.token) {
          dispatch(tokenholder(response.data.token));      
            toast.success("Signup successful!");
            navigate("/");
        }

      } catch (err) {
        console.error("Signup error:", err);
        toast.error("Signup failed. Please try again.");
      }
    
      
    };
 




  return (
    <div className="Signupbody">
      <div className="Signupform">
        <h2>Signup</h2>
        <form  onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name" 
              placeholder="Enter your full name"
              value={formData.name}
             onChange={handleChange}
              required
              minLength={3}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
             onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={10}
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
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
            />
          </div>

          {/* Submit */}
          <button type="submit" >Signup</button>
          <ToastContainer  position="top-right"/>
        </form>
      
      </div>
    </div>
  );
};


export default Signup;