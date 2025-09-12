import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { tokenholder } from "../../State/tokenslice/TokenSlice"



  // Import jwt-decode to decode JWT tokens
const Login = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          };

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
      
          try {
            const response = await axios.post<SignupResponse>("http://localhost:5000/api/auth/login", {
              email: target.email.value,
              password: target.password.value,
            },{
              withCredentials: true,
            });

            if (response.data.token) {
              dispatch(tokenholder(response.data.token)); 
                toast.success("Login successful!");
                navigate("/");


            }
      
          
            // 👉 here you can dispatch token to Redux or navigate
          } catch (err) {
            console.error("Login failed:", err);
          }
        };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-yellow-90 via-green-90 to-purple-120 text-center">
      <div className="w-1/2  bg-gradient-to-b from-blue-400 via-black-300 to-purple-4/00 border border-yellow-full rounded-4xl p-10">
        <h2 className="text-black text-[64px] text-center pt-4">Login</h2>
        

        <form onSubmit={handleSubmit}>
        
          <div className="w-1/2 mx-auto  pt-5  ">
            <label htmlFor="email" className="text-2xl block text-left pb-2 text-black ">Email:</label>
            <input
            className="text-xl  rounded-2xl p-2  border border-gray-300 w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="w-1/2 mx-auto pt-5">
            <label htmlFor="password" className="text-2xl block text-left pb-2 text-black">Password:</label>
            <input
            className="text-[22px]  rounded-2xl p-2  border border-gray-300 w-full "
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
             
              required
            />
          </div>
      
          <button type="submit" className="mt-4 rounded-2xl p-2 border border-gray-300 text-black
           text-4xl px-8 py-1 cursor-pointer transform transition-transform duration-300 hover:scale-105
            hover:text-white hover:bg-black " >Login</button>
        
        </form>

        <p className="register-link">
          
        </p>
      </div>
      <ToastContainer/>
    </div>
    
  );
}


export default Login;
