import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from './components/Login'
import OTPScreen from "./components/OTPScreen";
import Register from "./components/Register";
import Splash from "./components/Splash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/home/*" element={<Home/>} />
        <Route path="/otp" element={<OTPScreen/>} />
        <Route path="/dashboard/*" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
