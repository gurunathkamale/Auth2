// import type React from "react"

// import { Navigate, Outlet, useLocation } from "react-router-dom"
// // import { useAuth } from "../hooks/useAuth"
// import { useEffect, useState } from "react"
// import api from "../api/axios"
// // import { handleAxiosError } from "../utils/handleAxiosError"

// type props = {
  
//     allowedRoles?: string[] 
// }

// type User = {
//   id: string;
//   email: string;
//   role: string; 
// };

// const ProtectedRoutes: React.FC<props> = ({allowedRoles})=>{
// //    const {user, loading} = useAuth();
// const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation()

   

//    useEffect(() => {

   
//     const checkAuth = async () => {
//         if (location.pathname === "/login" || location.pathname === "/register") {
//         setLoading(false);
//         return;
//       }
//       try {
        
//         // This request automatically sends the HttpOnly cookie
//         const res = await api.get('/auth/profile');
//         setUser(res.data);
//       } catch {
//         // 401 or any error = not authenticated
//         setUser(null);
//         // throw new Error(handleAxiosError(err));
//         // console.log(err)
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

// //    console.log("USER FROM PROTECTED:", user);
//    if(loading) return <div>Loading..............</div>

//     if(!user) return <Navigate to="/login" replace/>;

//     if(allowedRoles && !allowedRoles.includes(user.role)  ) 
//         return <Navigate to="/unAuthorized" replace/>

//   return <Outlet/>
// }

// export default ProtectedRoutes


import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoutes: React.FC<Props> = ({ allowedRoles }) => {
  const { user, loading } = useAuth(); // USE AUTH CONTEXT ONLY

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
