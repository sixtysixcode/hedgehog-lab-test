import "../styles/auth.scss";

import Button from "./Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            id="exampleFormControlInput1"
            {...register("email", { required: "Email is required!" })}
          />
        </div>
        {errors.email && (
          <p className="auth__form__error text-danger">
            {errors.email.message?.toString()}
          </p>
        )}
      </div>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            id="exampleFormControlInput2"
            {...register("password", {
              required: "Password is required!",
            })}
          />
        </div>
        {errors.password && (
          <p className="text-right text-danger">
            {errors.password.message?.toString()}
          </p>
        )}
      </div>
      <div>
        <Button text={"Login"} loading={loading} large />
        <p className="text-right">
          Don't have an Account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
