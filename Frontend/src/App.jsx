import {Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){
  return(
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path="/Signup" element={<Signup></Signup>}></Route>
    </Routes>
  )
}

export default App
