import {Routes, Route ,Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPage from "./pages/Admin.jsx";
import AdminCreate from "./components/AdminCreate.jsx";
import AdminDelete from "./components/AdminDelete.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import Dummy from "./pages/Dummy.jsx";
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
      <Route path="/Admin" element={isAuthenticated && user?.role ==="admin" ? <AdminPage></AdminPage>:<Navigate to="/"/>}></Route>
      <Route path="/Admin/Create" element={isAuthenticated && user?.role==="admin"?<AdminCreate></AdminCreate>:<Navigate to="/"></Navigate>}></Route>
      <Route path="/Admin/Update" element={isAuthenticated && user?.role==="admin"?<AdminCreate></AdminCreate>:<Navigate to="/"></Navigate>}></Route>
      <Route path="/Admin/Delete" element={isAuthenticated && user?.role==="admin"?<AdminDelete></AdminDelete>:<Navigate to="/"></Navigate>}></Route>
      <Route path="/Problem/:problemID" element={<ProblemPage></ProblemPage>}></Route>
      <Route path="/dummy/:id" element={<Dummy></Dummy>}></Route>
    </Routes>
  )
}

export default App;
