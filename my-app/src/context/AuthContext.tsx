import React, { createContext,  useEffect,  useState } from "react";
import api from "../api/axios";
import { handleAxiosError } from "../utils/handleAxiosError";
import {   useNavigate } from "react-router-dom";

export type Role = "user" | "admin"

interface User {
    id: string,
    name: string,
    email: string,
    role: Role
}

interface AuthContextType{
    user: User | null,
    loading: boolean,
    login: (email: string, password: string)=>Promise<User>;
    register: (name: string, email: string, password: string, role?: Role)=>Promise<void>;
    logout: ()=> Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvide: React.FC<{children: React.ReactNode}> = ({children})=> {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // const location = useLocation();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     const fetchProfile= async()=>{
    //         try {

    //     //          if (location.pathname === "/login" || location.pathname === "/register") {
    //     //   setLoading(false);
    //     //   return;
    //     // }

    //             const res = await api.get("/auth/profile");
    //             // setUser(res.data)

                
    //         } catch  {
    //             // console.log(error)
    //             setUser(null)
    //             // throw new Error(handleAxiosError(error));

    //     // if(location.pathname !== '/login'){
    //     //             navigate('/login', {replace: true})
    //             // }

    //         }finally{
    //             setLoading(false)
    //         }
    //     }

    //     fetchProfile();
    // },[]);
    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // ✔ VERY IMPORTANT
      }
    };

    fetchProfile();
  }, []); // 


    const login = async(email: string, password: string)=>{
        try {
            setLoading(true);
            await api.post("/auth/login", {email,password})

            const res = await api.get<User>("/auth/profile");
            setUser(res.data)
            return res.data
            // console.log(user)
        } catch (error) {
            throw new Error(handleAxiosError(error));
            
        }finally{
            setLoading(false)
        }
    }

    const register = async(name: string, email:string, password: string, role: Role = "user")=>{
        try {
            setLoading(true)
            await api.post("/auth/register", {name,email,password,role})
        } catch (error) {
            throw new Error(handleAxiosError(error));
            
        }finally{
            setLoading(false)
        }
    };

    const logout =async()=>{
        try {
            setLoading(true);
            await api.post("/auth/logout");
            setUser(null)
            navigate("/login", { replace: true }); 
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }finally{
            setLoading(false)
        }
    }

    const Value:AuthContextType ={
        user,
        loading,
        login,
        register,
        logout
    }
  return  <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>
}
export {AuthContext}