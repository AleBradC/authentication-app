import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Implement your login logic here
    console.log(data);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
