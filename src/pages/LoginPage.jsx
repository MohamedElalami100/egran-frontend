import { authenticateUser } from "@/api/FarmerApi";
import HideIcon from "@/assets/HideIcon";
import LogoFull from "@/assets/LogoFull";
import { ReturnIcon } from "@/assets/ReturnIcon";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/auth/AuthProvider";

const LoginPage = () => {
  // State to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // reset error state

    try {
      const response = await login(username, password); // call login function

      // Check response and navigate based on the role
      if (response.authed && response.role === "ADMIN") {
        navigate("/admin/currentFlight"); // Navigate to admin dashboard
      } else if (response.authed && response.role === "FARMER") {
        navigate("/dashboard"); // Navigate to farmer dashboard
      }
    } catch (err) {
      setError(err.message); // Handle login failure and set error message
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-20 w-full m-0 flex-shrink-0 bg-white flex justify-between items-center px-8">
        <div className="w-6 h-6 cursor-pointer">
          <ReturnIcon />
        </div>
        <div className="cursor-pointer">
          <LogoFull />
        </div>
        <div></div>
      </div>
      <div className="flex-grow bg-custom-gradient flex justify-center items-center px-4 sm:px-8 md:px-16 lg:px-32 py-16">
        <div className="h-full w-full flex-shrink-0 rounded-[24px] bg-white max-w-md max-h-[600px] px-16 py-10">
          <div className="w-full h-full flex flex-col items-start">
            <div className="text-[#333] text-center text-3xl font-medium leading-normal">
              Sign in
            </div>

            <div className="h-8"></div>
            <div className="text-[#666] font-[poppins] text-base font-normal leading-normal mb-1">
              Email or Username
            </div>
            <input
              className="rounded-[12px] border border-[#666666] border-opacity-35 h-12 
            self-stretch w-full p-2"
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="h-8"></div>
            <div className="flex justify-between items-center w-full">
              <div className="text-[#666] font-[poppins] text-base font-normal leading-normal mb-1">
                Password
              </div>
              <div className="flex flex-row items-center gap-1 cursor-pointer">
                <div className="w-5 h-5">
                  <HideIcon />
                </div>
                <div className="text-[#666] font-[poppins] text-base font-normal leading-normal mb-1">
                  Hide
                </div>
              </div>
            </div>
            <input
              className="rounded-[12px] border border-[#666666] border-opacity-35 h-12 
            self-stretch w-full p-2"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="h-8"></div>
            <Button
              className="flex w-full h-12 py-4 px-0 justify-center items-center rounded-[32px]
             opacity-25 bg-[#111]"
              onClick={handleLogin}
            >
              <span className="text-white text-center font-[poppins] text-[18px] font-normal leading-normal">
                Sign In
              </span>
            </Button>

            <div className="h-2"></div>

            <div className="flex justify-between items-center w-full p-[2px]">
              <div className="flex flex-row gap-1">
                <div className="">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="accent-black w-full h-full cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="sr-only">
                    Remember me
                  </label>
                </div>
                <span className="text-[#333] font-poppins text-4 font-medium leading-normal">
                  Remember me
                </span>
              </div>

              <div className="cursor-pointer">
                <span className="text-[#333] font-poppins text-4 font-medium leading-normal">
                  Need help?
                </span>
              </div>
            </div>

            <div className="h-8"></div>
            <div className="text-[#666] font-[poppins] text-base font-normal leading-normal mb-1">
              Don’t have an acount?{" "}
              <span className="text-black font-medium underline cursor-pointer">
                Sign up{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
