import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { handleAxiosError } from "../utils/handleAxiosError";


interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  success: boolean;
  count: number;
  data: T;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get<ApiResponse<AdminUser[]>>("/auth/admin/users");
        setUsers(res.data.data);
        setCount(res.data.count)
      } catch (error) {
        alert(handleAxiosError(error));
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: unknown) {
      const err = error as Error
      alert(err.message || "Logout failed");
    }
  };

  return (
    <div>
    <div className="bg-black h-20 w-full">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.name}</p>

      <button onClick={handleLogout}>Logout</button>
</div>
      <h3>All Users <span style={{color:'red'}}>{count}</span> </h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
          
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

