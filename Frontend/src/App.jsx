import {Routes, Route ,Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from './authSlice.js';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";

function App(){
  const {isAuthenticated} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[]);

  return(
    <Routes>
      <Route path="/" element={isAuthenticated?<HomePage></HomePage>:<Navigate to="/Signup"/>}></Route>
      <Route path="/Login" element={isAuthenticated?<Navigate to="/"/>:<Login></Login>}></Route>
      <Route path="/Signup" element={isAuthenticated?<Navigate to="/"/>:<Signup></Signup>}></Route>
    </Routes>
  )
}

export default App
