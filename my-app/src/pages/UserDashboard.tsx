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
    <div style={{ padding: 20 }}>
      <h2>User Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      {/* <p>Email: {user?.email}</p> */}
      <p>Role: {user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
