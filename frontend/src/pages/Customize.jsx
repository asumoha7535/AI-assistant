import React, { useContext } from 'react'
import Card from '../components/Card'
import va1 from '../assets/va1.png'
import va2 from '../assets/va2.png'
import va3 from '../assets/va3.png'
import va4 from '../assets/va4.png'
import va5 from '../assets/va5.png'
import va6 from '../assets/va6.png'
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react'
import { useRef } from 'react'
import { userDataContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
 const {serverUrl,userdata, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage} = useContext(userDataContext);
  const inputImage = useRef();
  const navigate = useNavigate();

  const handleImage =(e)=>{
    const file = e.target.files[0];
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  return (
   <>
   <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020253] flex justify-center items-center flex-col p-[20px] gap-[20px]'>
          <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate('/')}/>
    
    <h1 className='text-white text-center text-[30px]'>Select Your<span className='text-blue-200'>Assistant Image</span></h1>
    <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px]'>
      <Card  image={va1}/>
      <Card  image={va2}/>
      <Card  image={va3}/>
      <Card  image={va4}/>
      <Card  image={va5}/>
      <Card  image={va6}/>

      <div className={`w-[150px] h-[250px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage == "input" ? "border-4 border-white shadow-2xl" : null}`} >
        <div className='w-full h-full flex justify-center items-center text-white font-bold text-2xl' onClick={()=>{inputImage.current.click()
           setSelectedImage("input")}
        }>
          {!frontendImage &&  <FaPlus />}
          {frontendImage && <img src={frontendImage} alt='user image' className='w-full h-full object-cover'/>}
         
</div>
<input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
    </div>
      </div>
      {selectedImage &&  <button className='w-[180px] h-[60px] mt-[30px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer'
       onClick={()=>navigate('/costomize2')}>Next</button>
}
      
   </div>
   </>
  )
}

export default Customize