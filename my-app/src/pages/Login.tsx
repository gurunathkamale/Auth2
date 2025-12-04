import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";

import { useForm } from "react-hook-form";
import type { LoginFormValues } from "../types/auth";
import { LoginSchema, type LoginFormData } from "../validations/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      const err = error as Error;
      setError("root", { message: err.message || "Login failed" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600">
      <div className=" bg-green-300 w-1/3 pb-2 rounded-2xl shadow-2xl ">
        <h2 className="text-center text-2xl m-3 text-blue-600">
          Sign In To Your Account
        </h2>

        <form
          className="flex flex-col items-center gap-3 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <label className="block text-xl">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="border-0 bg-white px-2 py-2 w-xs focus:border-0"
            />
            {errors.email && (
              <p className="text-red-500 ">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xl">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="border-0 bg-white px-2 py-2 w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Root error */}
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 border-0 w-25 rounded-xl shadow-amber-900 m-2 h-10 p-2 text-white"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <span className=" hover:text-blue-600">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
