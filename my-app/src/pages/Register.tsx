import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterFormData } from "../validations/RegisterSchema";
import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { handleAxiosError } from "../utils/handleAxiosError";
// import { registerUser } from './../../../backend/src/controllers/authControllers';
import { useAuth } from "../hooks/useAuth";

function Register() {

  const {register: registerUser} = useAuth();
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues:{
      role: 'user'
    }
  });

  const onSubmit = async(data: RegisterFormData) => {
    try {
        await registerUser(data.name, data.email, data.password, data.role);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as Error
      setError("root", {message: err.message || "Register Failed"})
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700">
      <div className="bg-green-100 shadow-2xl rounded-xl w-1/3 pt-3">
      <h2 className="text-3xl text-center text-green-700">Sign Up Form</h2>
      <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block">Name</label>
          <input  className="bg-white border p-1 w-2xs" type="text" placeholder="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block">Email</label>
          <input  className="bg-white border p-1 w-2xs" type="email" placeholder="email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block">Password</label>
          <input
           className="bg-white border p-1 w-2xs"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div >
          <label className="block" >Confirm Password</label>
          <input
          className="bg-white border p-1 w-2xs"
            type="password"
            placeholder="confirm password"
            // placeholder="confirmPassword"
            {...register("confirmPassword")}
          />
          <label  className="block">Role</label>
           <select {...register("role")}
            className="bg-white border">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
           {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <button type="submit" className="bg-indigo-600 w-30 rounded-2xl h-10" disabled={isSubmitting}>{isSubmitting ? "Registering......" : "Register"}</button>
        <p className="pb-2">
          Already have an Account <span className="px-2  hover:text-blue-600"><Link to="/login">Login</Link></span>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Register;
