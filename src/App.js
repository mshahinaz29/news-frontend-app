import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Preferences from "./pages/Preferences";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

function App() {  
  
  // const logJSONData = async ()  => {
  //   const response = await fetch('http://localhost/api/test');
  //   const jsonData = await response.json();
  //   console.log(jsonData);
  //   alert('completed')
    
  // }

  
  return (
    <div className='bg-slate-100 min-h-screen'>
        {/* <p>Ss</p>
        <button className='mt-6' onClick={logJSONData}>Fetch Apis</button> */}
        
          <Routes>
            <Route element={<AuthLayout />} >
              <Route path="/" element={<Home />} />
              <Route path="/preferences" element={<Preferences />} />
            </Route>
            <Route element={<GuestLayout />} >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>            
          </Routes>
    </div>  
  );
}

export default App;
