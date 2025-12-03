// import Navbar from "../components/Navbar"

import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{padding: '20'}}>
      <h1>Home</h1>
      <p>Welcome to App.</p>
      <p>
      <Link to={'/login'}>Login</Link> | {" "}
      <Link to={'/register'}>Register</Link>
      </p>
    </div>
  );
}

export default Home;
