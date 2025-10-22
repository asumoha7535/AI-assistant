import React, { useContext } from "react";
import robo1 from "../assets/robo1.png";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function SignIn() {
    const [showPassword, setShowPasswod] = useState(false)
    const {serverUrl,userdata, setUserData} = useContext(userDataContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [loading, setLoading] =  useState(false);

    const handleSignIn =async (e)=>{
  e.preventDefault();
  setError("")
  setLoading(true);
      try {
        let result = await axios.post(serverUrl + "/api/auth/signin",
            {email, password},
            {withCredentials : true});
            setUserData(result.data)
        setLoading(false);
        navigate('/')
      } catch (error) {
        console.log(error);
        setUserData(null);
        setLoading(false);
        setError(error)
      }
    }

  return (
    <>
      <div
        className="w-full h-[100vh] flex justify-center items-center"
        style={{
          backgroundImage: `url(${robo1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <form className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]" onSubmit={handleSignIn}>
      <h1 className="text-white text-[30px] font-semibold mb-[30px]">SignIn to <span className="text-blue-400">Virtual Assistant</span></h1>
      
      <input type="email" placeholder="Email" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]" value={email} required onChange={(e)=>setEmail(e.target.value)}/>

      <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
        <input type={showPassword ? "text" : "password"} placeholder="password" className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[20px] " value={password} required onChange={(e)=>setPassword(e.target.value)}/>
        {!showPassword && <IoEye className="absolute top-[18px] right-[25px] w-[25px] h-[25px] text-white cursor-pointer" onClick={()=>setShowPasswod(true)}/>
}
{showPassword && <IoEyeOff className="absolute top-[18px] right-[25px] w-[25px] h-[25px] text-white cursor-pointer" onClick={()=>setShowPasswod(false)}/>
}
      </div>
       {error.length > 0 && <p className="text-red-500">
        *{error}
        </p>}
      <button className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black font-semibold text-[19px]" disabled = {loading}>{loading ? 'Loading...' : 'Sign In'}</button>
       <p className="text-white text-[18px] cursor-pointer" onClick={()=>navigate('/signup')}>Already an account ? <span className="text-blue-400"> Sign Up</span></p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
