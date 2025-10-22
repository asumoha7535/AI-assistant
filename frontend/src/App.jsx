import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import { userDataContext } from "./context/UserContext";
import Home from './pages/Home'
import Costomize2 from './pages/Costomize2'

function App() {
  const {userdata, setUserData} = useContext(userDataContext)
  return (
   <Routes>
    <Route path='/' element={(userdata?.assistantImage && userdata?.assistantName) ? <Home /> : <Navigate to={'/costomize'} />}/>
    <Route path='/signup' element ={!userdata ? <SignUp /> : <Navigate to={'/costomize'} />} />
    <Route path='/signin' element ={!userdata ? <SignIn /> : <Navigate to={'/'} />} />
    <Route path='/costomize' element={userdata ? <Customize /> : <Navigate to={'/signup'} />}/>
        <Route path='/costomize2' element={userdata ? <Costomize2 /> : <Navigate to={'/signup'} />}/>

   </Routes>
  )
}

export default App