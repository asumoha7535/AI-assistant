import React, { createContext, useEffect, useState } from "react";
import App from "../App";
import axios from "axios";
import { FaSwatchbook } from "react-icons/fa6";

export const userDataContext = createContext();
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000"
 const [userdata, setUserData] = useState(null);
 const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
 const handleCurrentUser = async()=>{
  try {
    const result = axios.get(`${serverUrl}/api/user/current`, {withCredentials : true})
    setUserData(result.data)
    console.log(result.data);
    
  } catch (error) {
    console.log(error);
    
  }
 }

 const getGeminiResponse = async (command)=>{
  try {
    const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, {command}, {withCredentials : true})
    return result.data
  } catch (error) {
    console.log(error);
    
  }
 }

 useEffect(()=>{
  handleCurrentUser()
 },[])
  return (
    <div>
      <userDataContext.Provider value={{serverUrl,userdata, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage, getGeminiResponse}}>
     {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
