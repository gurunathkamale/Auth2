import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";

import { useForm } from "react-hook-form";
import type { LoginFormValues } from "../types/auth";
import { LoginSchema, type LoginFormData } from "../validations/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import api from "../api/axios";


function Login() {
  const navigate = useNavigate();
  const {login} =useAuth()


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    setError,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(LoginSchema),
  });

const onSubmit = async (data: LoginFormData) => {
  try {
    const loggedInUser = await login(data.email, data.password); 
    // 👆 now you have the user object

    if (loggedInUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  } catch (error: unknown) {
    const err = error as Error
    setError("root", { message: err.message || "Login failed" });
  }
};


  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      
        <h2>Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
           <label>Email</label>
          <input type="email"  {...register("email")} />
          {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
        </div>
        <div>
           <label>Password</label>
          <input
            type="password"
            // placeholder="password"
            {...register("password")}
          />
          {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
        </div>
           {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p>
          Don&apos;t have an Account <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
