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
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            // placeholder="confirmPassword"
            {...register("confirmPassword")}
          />
          <label>Role</label>
           <select {...register("role")}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
           {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Registering......" : "Register"}</button>
        <p>
          Already have an Account<Link to="/">login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
