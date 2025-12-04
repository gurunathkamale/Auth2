import React from "react";
import { useAuth } from "../hooks/useAuth";


const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: unknown) {
      const err= error as Error
      alert(err.message || "Logout failed");
    }
  };

  return (
    <div>
    <div className="bg-black w-full h-20 items-center flex justify-between text-white ">
      <p>Welcome, {user?.name}</p>
      {/* <p>Email: {user?.email}</p> */}
      {/* <p>Role: {user?.role}</p> */}
      <button onClick={handleLogout} className="bg-green-800 w-25 h-10 mr-3 hover:bg-red-600">Logout</button>
    </div>
      <h2 className="text-3xl pt-10 text-center">User Dashboard</h2>
    </div>
  );
};

export default UserDashboard;
