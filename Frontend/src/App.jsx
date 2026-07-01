import {Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth } from './authSlice.js';
import { useDispatch,useSelector } from 'react-redux';

function App(){
  const {isAuthenticated} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  return(
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path="/Signup" element={<Signup></Signup>}></Route>
    </Routes>
  )
}

export default App
