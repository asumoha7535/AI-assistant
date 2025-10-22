import React, { useContext, useState } from 'react'
import { userDataContext } from "../context/UserContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";

function Costomize2() {
  const {userdata, backendImage, selectedImage, serverUrl, setUserData} = useContext(userDataContext);
  const [assistantName , setAssistantName]= useState(userdata?.assistantName || "")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpdateAssistant = async ()=>{
   setLoading(true)
    try {
      const formData = new FormData();
      formData.append('assistantName', assistantName);
      if(backendImage){
              formData.append('assistantImage', backendImage);
      }else{
        formData.append('imageUrl', selectedImage);
      }
      const result = await axios.post(serverUrl + '/api/user/update',formData, {withCredentials : true})
    setLoading(false)
      console.log(result.data);
      setUserData(result.data);
      navigate('/');
    } catch (error) {
      setLoading(false)
      console.log(error);
      
    }
  }
  return (
    <>
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020253] flex justify-center items-center flex-col p-[20px] gap-[20px] relative'>
      <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate('/costomize')}/>

       <h1 className='text-white text-center text-[30px]'>Enter Your <span className='text-blue-200'>Assistant Name</span></h1>

       <input type="text" placeholder="eg:sifra" className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]"  required value={assistantName} onChange={(e)=>setAssistantName(e.target.value)}/>
        {assistantName &&  <button className='w-[280px] h-[60px] mt-[30px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer' disabled ={loading} onClick={()=>{
          navigate('/costomize')
          handleUpdateAssistant()
        }}>{!loading ? "Finally Create Your Assistant" : ""}</button>}
       
    </div>
    </>
  )
}

export default Costomize2