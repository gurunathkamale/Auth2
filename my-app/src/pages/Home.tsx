// import Navbar from "../components/Navbar"

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      {/* <h1>Home</h1> */}
      <h1 className="text-blue-600 text-3xl">Welcome to App.</h1>
      <p className="text-xl" >
      <span className="hover:text-blue-600"><Link to={'/login'}>Login</Link></span> | {" "}
      <span className="hover:text-blue-600"><Link to={'/register'}>Register</Link></span> 
      
      </p>
    </div>
  );
}

export default Home;
