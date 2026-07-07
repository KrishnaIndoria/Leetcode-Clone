import {Routes, Route ,Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPage from "./pages/AdminPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import { checkAuth } from './authSlice.js';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";

function App(){
  const {isAuthenticated,loading,user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[]);

  if(loading){
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-cyan-400"></span>

                <h2 className="text-white text-xl font-semibold tracking-wide">
                    Loading...
                </h2>

                <p className="text-slate-400 text-sm">
                    Please wait
                </p>
            </div>
        </div>
    );
  }
  
  return(
    <Routes>
      <Route path="/" element={isAuthenticated?<HomePage></HomePage>:<Navigate to="/Signup"/>}></Route>
      <Route path="/Login" element={isAuthenticated?<Navigate to="/"/>:<Login></Login>}></Route>
      <Route path="/Signup" element={isAuthenticated?<Navigate to="/"/>:<Signup></Signup>}></Route>
      <Route path="/Admin" element={isAuthenticated && user?.role ==="Admin" ? <AdminPage></AdminPage>:<Navigate to="/"/>}></Route>
      <Route path="/Problem/:problemID" element={<ProblemPage></ProblemPage>}></Route>
    </Routes>
  )
}

export default App;
