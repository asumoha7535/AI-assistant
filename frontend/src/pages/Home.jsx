import React, { useContext, useEffect, useRef , useState} from 'react'
import { userDataContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ai from '../assets/Ai.gif'
import usergif from '../assets/user.gif'
import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const {userdata, serverUrl, setUserData,  getGeminiResponse} = useContext(userDataContext)
  const navigate = useNavigate();
  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("");
  const isSpeakingRef = useRef(false);
  const recoginitionRef = useRef(null);
  const [ham, setHam] = useState(false)
    const isRecogizingRef = useRef(false)

  const synth = window.speechSynthesis
  const handleLogout = async()=>{
    try {
        const result = await axios.get(serverUrl + '/api/auth/logout' , {withCredentials : true})
        setUserData(null)
    navigate('/signin')
    } catch (error) {
      console.log(error);
      
    }
  
  }

  const startReconition =()=>{
   if(!isSpeakingRef.current && !isRecogizingRef.current){
     try {
      recoginitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if(!error.message.includes("start")){
        console.error("Recognition error:", error);
      }
   }
    }
  }

  const speak =(text)=>{
    const utterence = new SpeechSynthesisUtterance(text)
      utterence.lang = 'hi-IN';
      const voices = window.speechSynthesis.getVoices()
      const  hindiVoice = voices.find(v => v.lang === 'hi-IN');
      if(hindiVoice){
        utterence.voice = hindiVoice;
      }
    isSpeakingRef.current = true
    utterence.onend =()=>{
      setAiText("")
      isSpeakingRef.current = false
 
        setTimeout(()=>{
          startReconition()
        },800)
    }
    synth.cancel();
    synth.speak(utterence);
  }

  const handleCommand = (data)=>{
    const {type, userInput, response}= data

    if(type === 'google-serach'){
    const query = encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }
  if(type === 'calculator-open'){
    window.open(`https://www.google.com/search?q=calculator`, '_blank');
  }
  if(type === 'instagram-open'){
    window.open(`https://www.instagram.com/`, '_blank');
  }
  if(type === 'facebook-open'){
    window.open(`https://www.facebook.com/`, '_blank');
  }
  if(type === 'weather-show'){
    window.open(`https://www.google.com/search?q=weather`, '_blank');
  }
  if(type === 'youtube-search' || type === 'youtube-play'){
    const query = encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  }

  }
  useEffect(()=>{
 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

 const recoginition = new SpeechRecognition();
 recoginition.continuous = true;
 recoginition.lang = 'en-US';
recoginition.interimResults = false;

 recoginitionRef.current = recoginition;

 let isMounted = true;

 const  startTimeout = setTimeout(()=>{
  if(isMounted && !isSpeakingRef.current && !isRecogizingRef.current){
    try {
      recoginition.start();
      console.log("Recoginition requsted to start");
      
    } catch (error) {
      if(error.name !== "InvalidStateError"){
        console.log(error);
        
      }
    }
  }
 },1000)


 recoginition.onstart =()=>{
  console.log("recogination startted");
  isRecogizingRef.current = true;
  setListening(true)
 };

 recoginition.onend =()=>{
  console.log("recoginaition end");
  isRecogizingRef.current = false;
  setListening(false)

  if(isMounted && !isSpeakingRef.current){
  setTimeout(()=>{
   if(isMounted){
    try {
      recoginition.start();
      console.log("Recoginition restarted");
      
    } catch (error) {
      if(error.name !== "InvalidStateError"){
        console.log(error);
        
      }
    }
   }
  },1000)
 }
 };

 recoginition.onerror = (event)=>{
  console.warn("Recogination error", event.error);
  isRecogizingRef.current = false;
  setListening(false);
  if(event.error !== "aborted" && isMounted && !isSpeakingRef.current){
    setTimeout(()=>{
      if(isMounted){
        try {
          recoginition.start();
          console.log("recoginition  restated after error");
          
        } catch (error) {
          if(error.name !== "InvaliStateError"){
            console.log(error);
            
          }
        }
      }
    },1000)
  }
 }

 

recoginition.onresult = async (e) => {
  const transcript = e.results[e.results.length - 1][0].transcript.trim();
  console.log(transcript);

  if (
    transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())
  ) {
    setAiText("")
    setUserText(transcript)
    recoginition.stop()
        isRecogizingRef.current = false
    setListening(false)
    const data = await getGeminiResponse(transcript);
    console.log(data);
    speak(data.response)
   handleCommand(data)
   setAiText(data.response)
   setUserText("")
  }
};


  const greeting = new SpeechSynthesisUtterance(`Hello ${userdata.name} , what can I help you with?`);
  greeting.lang = 'hi-IN';
  window.speechSynthesis.speak(greeting);

return ()=>{
  isMounted = false;
  clearTimeout(startTimeout);
  recoginition.stop()
  setListening(false)
  isRecogizingRef.current = false
}

  },[])
  return (
    <>
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020253] flex justify-center items-center flex-col  gap-[20px] overflow-hidden'>
      <RiMenu3Line className='lg:hidden text-white  absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(true)}/>
      <div className={`absolute top-0 w-full h-full bg-[#0000005a] backdrop:blur-lg p-[20px] lg:hidden flex flex-col gap-[20px] items-start ${ham?'translate-x-0' : 'translate-x-full'} transition-transform`}>
         <RxCross1  className=' text-white  absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(false)}/>
          <button className="min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px]  top-[20px] right-[20px] cursor-pointer" onClick={handleLogout}>Log Out</button>
        <button className="min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px]  top-[100px] px-[20px] py-[20px] right-[20px] cursor-pointer" onClick={()=>navigate('/costomize')}>Costomize Your Account</button>

        <div className='w-full h-[2px] bg-gray-400'></div>
        <h1 className='text-white font-semibold text-[19px]'>History</h1>
        <div className='w-full h-[400px] gap-[20px] overflow-auto flex flex-col overflow-y-auto'>
          {userdata.history ? userdata.history.map((his, idx) => (
            <span className='text-[18px] text-gray-200 truncate' key={idx}>{his}</span>
          )) : null}
        </div>
      </div>

       <button className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black font-semibold text-[19px] absolute hidden lg:block top-[20px] right-[20px] cursor-pointer" onClick={handleLogout}>Log Out</button>
        <button className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black hidden lg:block font-semibold text-[19px] absolute top-[100px] px-[20px] py-[20px] right-[20px] cursor-pointer" onClick={()=>navigate('/costomize')}>Costomize Your Account</button>
    <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
      <img src={userdata?.assistantImage} alt="" className='h-full object-cover' />
    </div>
    <h1 className='text-white text-[18px] font-semibold'>I'm {userdata?.assistantName}</h1>
    {!aiText  &&  <img  src={usergif} alt='' className='w-[200px]'/>}
    {aiText  &&  <img  src={ai} alt='' className='w-[200px]'/>}

    <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText?userText:aiText?aiText:null}</h1>

    </div>
    </>
  )
}

export default Home