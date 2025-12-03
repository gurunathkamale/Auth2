
// import { Route, Routes } from "react-router-dom"
// import Home from "../pages/Home"
// import Login from "../pages/Login"
// import Register from "../pages/Register"
// import Unauthorized from "../pages/Unauthorized"
// import UserDashboard from "../pages/UserDashboard"
// import AdminDashboard from "../pages/AdminDashboard"
// import PageNotFound from "../pages/PageNotFound"
// import ProtectedRoutes from "./ProtectedRoutes"


// function AppRoutes() {
//   return (
//  <Routes>
//   <Route path="/" element={<Home/>}/>
//   <Route path="/login" element={<Login/>}/>
//   <Route path="/register" element={<Register/>}/>
//     <Route path="/unauthorized" element={<Unauthorized/>}/>
  
  

// {/*protected routes for check user*/}
//   <Route path="/user" element={
//      <ProtectedRoutes allowedRoles={["user"]}>

//        <UserDashboard/>
//      </ProtectedRoutes>
//     }/>


//    {/* protected routes only for admin */}
//   <Route path="/admin" element={
//     <ProtectedRoutes allowedRoles={[ 'admin']}>
      
//       <AdminDashboard/>
//     </ProtectedRoutes>
//     }/>

//     {/*fallback ui*/ }
//   <Route path="*" element={<PageNotFound/>}/>
//  </Routes>
    
//   )
// }

// export default AppRoutes

import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Unauthorized from "../pages/Unauthorized"
import UserDashboard from "../pages/UserDashboard"
import AdminDashboard from "../pages/AdminDashboard"
import PageNotFound from "../pages/PageNotFound"
import ProtectedRoutes from "./ProtectedRoutes"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 🔥 PROTECTED USER ROUTE (any logged-in user allowed) */}
      {/* <Route element={<ProtectedRoutes allowedRoles={["user", "admin"]} />}>
      <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDashboard />} />
      </Route> */}

      {/* 🔥 PROTECTED ADMIN ROUTE */}
      {/* <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route> */}

      <Route element={<ProtectedRoutes allowedRoles={["user", "admin"]} />}>
  <Route path="/user" element={<UserDashboard />} />
  <Route path="/" element={<Home />} />
</Route>

<Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
  <Route path="/admin" element={<AdminDashboard />} />
</Route>


      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
